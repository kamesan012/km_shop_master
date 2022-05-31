import axios from 'axios'
import router from '../router/index'
import { ElMessage } from 'element-plus'

const baseUrl = 'http://localhost:3000/'

const myAxios = axios.create({
  timeout: 1000 * 30,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

// 请求拦截
myAxios.interceptors.request.use(config => {
  config.headers['token'] =  sessionStorage.getItem('token') // 请求头带上token
  return config
}, error => {
  return Promise.reject(error)
})

export default function http (url, data = {}, method = 'GET') {
    return new Promise(function (resolve, reject) {
      // 执行异步ajax请求
      let promise
      if (method === 'GET') {
        promise = myAxios({
          url: baseUrl + url,
          method,
          params: data
        })
      } else {
        // 发送post或者其它类型请求
        promise = myAxios({
          url: baseUrl + url,
          method,
          data
        })
      }
      promise.then(function (response) {
        // 成功了调用resolve()
        if (response.data.code === 401) {
          ElMessage({
            message: 'token已过期，请重新登录',
            type: 'error'
          })
          sessionStorage.clear()
          router.push('/Login')
        } else {
          resolve(response.data)
        }
      }).catch(function () {
        // 失败了调用reject()
        reject(new Error('error'))
      })
    })
  }
  
