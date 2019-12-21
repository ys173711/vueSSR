/* eslint-disable no-debugger */
import axios from 'axios'
import { createError } from './util'

const request = axios.create({
  baseURL: '/'
})

const handleRequest = (request) => {
  return new Promise((resolve, reject) => {
    request.then(resp => {
      const data = resp.data
      if (!data) {
        return reject(createError(400, 'no data'))
      }
      if (!data.success) {
        return reject(createError(400, data.message))
      }
      resolve(data.data)
    }).catch((err) => {
      // 注意这里 axios 把非200或300的http状态码都认为是错误，会在这里捕获
      // console.dir(err)
      if (err.response.status === 401) {
        reject(createError(401, err.response.data))
      }
    })
  })
}

export default {
  getAllTodos () {
    return handleRequest(request.get('/api/todos'))
  },
  login (username, password) {
    return handleRequest(request.post('/user/login', {username, password}))
  }
}
