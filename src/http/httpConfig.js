import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
// import router from '../router';
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
// 创建axios实例
const instance = axios.create({
  timeout: 600000, // 超时时间
  baseURL: '/'
})
// 添加request拦截器
instance.interceptors.request.use(
config => {
  config.headers.Authorization = store.getters.getTokenType + ' ' + store.getters.getToken
  return config
  },
    error => {
      return Promise.reject(error)
  }
)
// 是否正在刷新的标记
let isRefreshing = false
// 重试队列，每一项将是一个待执行的函数形式
let requests = []
// 添加response拦截器
instance.interceptors.response.use(
  response => {
    const { status, code } = response.data
    const config = response.config
    if (status === 401) {
      // refresh invalid
      if (config.url.includes('/ulp-navigation/api/v1.0/token/refresh')) {
        location.href = process.env.APP_P_PATH + '/login'
      }
      if (!isRefreshing) {
        isRefreshing = true
        const refreshToken = store.getters.getRefreshToken
        return instance.post('/ulp-navigation/api/v1.0/token/refresh', { refreshToken: refreshToken }).then(res => {
          if (res.data && res.data.data && res.data.data.access_token) {
            const tokenData = res.data.data
            store.commit('token', tokenData.access_token)
            store.commit('refreshToken', tokenData.refresh_token)
            store.commit('tokenType', tokenData.token_type)
            config.headers.Authorization = tokenData.access_token
            config.baseURL = '/'
            // 已经刷新了token，将所有队列中的请求进行重试
            requests.forEach(cb => cb(tokenData.access_token))
            requests = []
            if (config.url.includes('/ulp-navigation/api/v1.0/token/user')) {
              config.data = JSON.stringify({ accessToken: tokenData.access_token })
            }
            return instance(config)
          } else {
            store.commit('clearToken')
            location.href = process.env.APP_P_PATH + '/login'
          }
        }).catch(res => {
          console.error('refresh token error =>', res)
          window.location.href = process.env.APP_P_PATH + '/login'
        }).finally(() => {
          isRefreshing = false
        })
      } else {
        // 正在刷新token，将返回一个未执行resolve的promise
        return new Promise((resolve) => {
          // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
          requests.push((token) => {
            config.baseURL = '/'
            config.headers.Authorization = token
            // 修改该请求请求参数
            if (config.url.includes('/ulp-navigation/api/v1.0/token/user')) {
              config.data = JSON.stringify({ accessToken: token })
            }
            resolve(instance(config))
          })
        })
      }
    } else if (status === 500) {
      Message.error(response.data.message)
      location.href = process.env.APP_P_PATH + '/err'
    } else if (status && status !== 0 && !config.headers.closeMsg) {
      if (response.data.message) {
        Message.error(response.data.message)
      }
    } else if (code && !config.headers.closeMsg && !response.data.success) {
      if (response.data.message) {
        Message.error(response.data.message)
      }
    }
    return response
  },
  error => {
      if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
        // console.error(error);
        // location.href = '/timeout'
        Message.error('请求超时')
      }
      if (error.response && error.response.status === 404) {
          // 跳转到xx页面
        location.href = process.env.APP_P_PATH + '/404'
      }
      if (error.response && error.response.status === 500 && error.response.data) {
        if (error.response.data.message) {
          Message.error(error.response.data.message)
        } else {
          Message.error(error.response.data)
        }
        // location.href = '/err'
      } else {
        console.error('response error =>', error);
      }
      return Promise.reject(error.response)
  }
)
// window.onbeforeunload = function (e) {
//   console.log(1)
//   store.getters.getToken ? window.localStorage.setItem('_at', store.getters.getToken) : window.localStorage.removeItem('_at')
//   store.getters.getTokenType ? window.localStorage.setItem('_tt', store.getters.getTokenType) : window.localStorage.removeItem('_tt')
//   store.getters.getRefreshToken ? window.localStorage.setItem('_rt', store.getters.getRefreshToken) : window.localStorage.removeItem('_rt')
// }
// 导出 -------------------------------
export {
  instance
};
