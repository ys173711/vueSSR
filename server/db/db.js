const sha1 = require('sha1') // 帮我们生成一个请求线上数据库的签名
const axios = require('axios')

const className = 'todo' // 线上数据库存储数据时需要一个命名空间，在我们请求时则把它带上
const request = axios.create({ // 创建axios实例，包含所有axios的方法，同时，实例的请求都是基于这个baseURL的拼接
  baseURL: 'https://d.apicloud.com/mcm/api' // 官方文档：相关API访问需要在 https://d.apicloud.com/mcm/api下。
})

// 处理返回请求格式，状态码统一处理
const createError = (code, resp) => {
  const err = new Error(resp.message)
  err.code = code
  return err
}
const handleRequest = ({status, data, ...rest}) => {
  if (status === 200) {
    return data
  } else {
    throw createError(status, rest)
  }
}

module.exports = (appId, appKey) => {
  // 统一线上数据库必须包含的请求头
  const getHeaders = () => {
    const now = Date.now()
    return {
      'X-APICloud-AppId': appId,
      'X-APICloud-AppKey': `${sha1(`${appId}UZ${appKey}UZ${now}`)}.${now}`
    }
  }

  return {
    async getAllTodos () {
      return handleRequest(await request.get(`/${className}`, {
        headers: getHeaders()
      }))
    },
    async addTodo (todo) {
      return handleRequest(await request.post(`/${className}`, todo, {
        headers: getHeaders()
      }))
    },
    async updateTodo (id, todo) {
      return handleRequest(await request.put(`/${className}/${id}`, todo, {
        headers: getHeaders()
      }))
    },
    async deleteTodo (id) {
      return handleRequest(await request.delete(`/${className}/${id}`, {
        headers: getHeaders()
      }))
    }
  }
}
