const sha1 = require('sha1') // 帮我们生成一个请求线上数据库的签名
const axios = require('axios')

const className = 'todo' // 线上数据库存储数据时需要一个命名空间，在我们请求时则把它带上
const request = axios.create({ // 创建axios实例，包含所有axios的方法，同时，实例的请求都是基于这个baseURL的拼接
  baseURL: 'https://d.apicloud.com/mcm/api'
})

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
  const getHeaders = () => {
    const now = Date.now()
    return {
      'X-APICloud-AppId': appId,
      'X-APICloud-AppKey': `${sha1(`${appId}UZ${appKey}UZ${now}`)}.${now}`
    } // 发送请求到线上数据库必须包含的两个头信息
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
    }
  }
}
