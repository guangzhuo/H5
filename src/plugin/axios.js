import axios from 'axios'
import qs from 'qs'
import util from '@/plugin'
import router from '@/router'
import {Toast} from 'vant'

let options = {
  timeout: 80000, //  超时时间
  // withCredentials: true, //  发送跨域请求
  headers: {
    // 'content-type': 'application/x-www-form-urlencoded'
    'Content-Type': 'application/json;charset=UTF-8',
  }
}

// 请求错误处理
let axiosInstance = axios.create(options)
axiosInstance.defaults.headers.common['Authorization'] = util.getCookie('loginToken');
axiosInstance.interceptors.request.use(config => {
  if(config.url.indexOf('Login') > -1) {
    util.setCookie('loginToken', '');
    config.headers.Authorization = '';
  } else {
    config.headers.Authorization = util.getCookie('loginToken');
  }
  return config
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

axiosInstance.interceptors.response.use(response => {
  // 业务状态码不等于200
  const config = response.config
  const headers = response.headers
  let data = response.data || {}
  const { code, msg } = data

  // 登录失效跳转到登录
  if (code === -1) {
    util.delCookie('loginToken')
    Toast(msg)
    router.push('login')
  }

  return Promise.resolve(data || {})
}, (error) => {
  let { code, msg } = error.response.data
  if( code == 600 ) {
    util.setCookie('loginToken', '')
    Message.error({
      message: msg
    })
    router.push('/login')
    // Promise.reject()
  }

  return Promise.reject(error.response)
})

export default axiosInstance
