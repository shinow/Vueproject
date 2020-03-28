/**
 *
 * http配置
 */
// 引入axios以及element ui中的loading和message组件
import axios from 'axios'
import {
  baseUrl
} from './env'
import Element from 'element-ui'
import router from '@/router'
import nprogress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
nprogress.configure({
  showSpinner: false
}) // NProgress Configuration

let msgError = '服务器君开小差了，请稍后再试'

const service = axios.create({
  baseURL: baseUrl, // api的base_url
  timeout: 100000, // request timeout
  withCredentials: true
})
service.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
// HTTPrequest拦截
service.interceptors.request.use(config => {
  nprogress.start() // 进度条开始
  // if (store.getters.token) {
  // 	config.headers['X-Token'] = getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  // }
  config.method = 'post'
  return config
}, error => {
  return Promise.reject(error)
})

// HTTPresponse拦截
service.interceptors.response.use(res => {
  nprogress.done() // 进度条结束
  let RESPONSE_CODE = res.data.httpCode
  let RESPONSE_MSG = res.data.msg
  if (router.currentRoute.path != '/login' && router.currentRoute.path != '/transaction' && router.currentRoute.path != '/user' && router.currentRoute.path != '/account' && router.currentRoute.path != '/deal' && router.currentRoute.path != '/dismingx' && router.currentRoute.path != '/cocard') {
    if (RESPONSE_CODE == 0) {
      if (!res.data.data) {
        Element.Message({
          message: '操作成功',
          type: 'success'
        })
      }
    } else {
      if (RESPONSE_CODE == -1) {
        Element.Message({
          message: '操作失败',
          type: 'error'
        })
      } else {
        if (RESPONSE_CODE == 10001) {
          // 身份验证失败跳转登录页面
          router.push({
            path: '/login'
          })
        }
        setTimeout(() => {
          Element.Message({
            message: RESPONSE_MSG,
            type: 'error'
          })
        }, 0)
      }
    }
  } else {
    if (RESPONSE_CODE == 10001) {
      Element.Message({
        message: RESPONSE_MSG,
        type: 'error'
      })
    }
  }
  return res
}, (error) => {
  if (error && error.response) {
    if (error.response.status == 502 || error.response.status == 500 || error.response.status == 504) {
      // Element.Message.warning("正在访问，请勿重复点击哦！")
      return
    }
  }
  nprogress.done()
  Element.Message.error(msgError)
  router.push({
    path: '/login'
  })
  return Promise.reject(error)
})
export default service
