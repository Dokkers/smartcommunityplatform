import axios from 'axios'

// const baseURL = window.location.hostname == "192.168.1.117"?'http://192.168.1.117:6002':'/api'
const request = axios.create({
  baseURL: '/api', // 注意！！ 这里是全局统一加上了 后端接口前缀 前缀，后端必须进行跨域配置！
  // baseURL: 'http://192.168.1.117:6002',
  timeout: 500000
})

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
  // config.headers['Content-Type'] = 'application/json;charset=utf-8'
  // config.headers['Content-Type'] = 'multipart/form-data; boundary=--------------------------572077816932824076889972'
  // config.headers['token'] = user.token;  // 设置请求头
  return config
}, error => {
  return Promise.reject(error)
})

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
  response => {
    let res = response.data
    // 如果是返回的文件
    if (response.config.responseType === 'blob') {
      return res
    }
    // 兼容服务端返回的字符串数据
    if (typeof res === 'string') {
      res = res ? JSON.parse(res) : res
    }
    return res
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)
export default request
