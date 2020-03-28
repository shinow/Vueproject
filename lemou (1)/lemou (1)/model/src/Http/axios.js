import axios from 'axios'
import router from '@/router'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.headers = config.headers ? config.headers : {}
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if (response.status == 200) {
    let res = response.data;
    if (res.code && res.msg) {
      return res;
    }
  } else if (response.status == 403) {
    //如果有需要添加自己想加的操作
    console.log("403")
  } else if (response.status >= 500 && response.status < 600) {
    this.$toast.error({
      message: "系统繁忙"
    })

  }
}, function (error) {
  router.push({
    path: '/login'
  })
  if (error.response.status == 403) {
    //如果有需要添加自己想加的操作
  } else if (error.response.status >= 500 && error.response.status < 600) {
    //如果有需要添加自己想加的操作
  } else {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
});
export default axios
