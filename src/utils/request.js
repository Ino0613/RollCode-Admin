import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // URL = 基本URL + 请求URL
  // withCredentials: true, // 跨域请求时发送cookies
  timeout: 5000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在请求发送之前做些什么

    if (store.getters.token) {
      // 让每个请求携带token
      // ['X-Token']是自定义头部字段，请根据实际情况修改
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // 对请求错误做些什么
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  /**
   * 如果您想获取HTTP信息，例如headers或status
   * 请返回 response => response
   */
  /**
   * 根据自定义代码确定请求状态
   * 这里仅是一个例子
   * 您也可以通过HTTP状态码判断状态
   */
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    // 如果自定义代码不为20000，则判断为错误
    if (res.code !== 20000) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      // 50008: 非法token; 50012: 其他客户端登录; 50014: Token过期;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        // 重新登录
        MessageBox.confirm('您已经注销，可以取消停留在此页面，或者重新登录', '确认注销', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } if (res.code === 20000) {
      // Message({
      //   message: res.msg || '登陆成功',
      //   type: 'success',
      //   duration: 5 * 1000
      // })
      return res
    } else {
      Message({
        message: res.msg || '出现未知错误！',
        type: 'error',
        duration: 5 * 1000
      })
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.msg,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
