import axios from 'axios'
import { Message } from 'element-ui';
import router from '@/router/router.js'
// import store from '@/store/index.js'
// console.log("--------", process.env)
const service = axios.create({
  // baseURL: process.env.VUE_APP_JURISDICTION_API,
  timeout: 5000,
  headers: {
    'X-Custom-Header': 'foobar'
  }
})

// request interceptor
service.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
})

// response interceptor
service.interceptors.response.use(function (response) {
  console.log(response, 'konglingzhan')
  if (response.data.code === 0 || response.status === 200) {
    return response;
  } else {
    Message({
      type: 'warning',
      message: response.data.message
    })
  }
}, function (error) {
  // service error : 404,400,500 handler
  switch (error.response.status) {
    case 404:
      router.push('/404');
      break;
    case 401:
      router.push('/login');
      break;
    case 500:
    case 501:
      router.push('/50X');
      break;
    default:
      break;
  }
  return Promise.reject(error);
})

export default service
