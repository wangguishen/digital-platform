import axios from 'axios'
// import { Message } from 'element-ui';
// import store from '@/store/index.js'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
  headers: {
    'X-Custom-Header': 'foobar'
  }
})

// request拦截器
service.interceptors.request.use(function (config) {
  // 请求是否有token  权限控制
  // if (store.getters.token) {
  //   config.headers['X-Token'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  // }
  return config;
}, function (error) {
  return Promise.reject(error);
})

// respone拦截器
service.interceptors.response.use(function (response) {
  // console.log(response,'res');
  if (response.data.state !== 200) {
    // do someting at not 200
    Message({
      type: 'warning',
      message: response.data.message
    })
  } else {
    return response;
  }
}, function (error) {
  // service error : 404,400,500 handler
  // console.log(error,'error')
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error);
})

export default service
