import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: '',
    refreshToken: '',
    tokenType: '',
    loginConfig: { },
    loginType: ''
  },
  getters: {
    getLoginConfig: state => {
      const config = state.loginConfig
      if (config && config.supportLoginModes) {
        for (var i = 0; i < config.supportLoginModes.length; i++) {
          const configElement = config.supportLoginModes[i]
          if (configElement.mode === state.loginType) {
            return configElement
          }
        }
      }
    },
    getToken: state => {
      return state.accessToken ? state.accessToken : window.localStorage.getItem('_at') ? window.localStorage.getItem('_at') : ''
      // return state.accessToken
    },
    getTokenType: state => {
      return state.tokenType ? state.tokenType : window.localStorage.getItem('_tt') ? window.localStorage.getItem('_tt') : ''
      // return state.tokenType
    },
    getRefreshToken: state => {
      return state.refreshToken ? state.refreshToken : window.localStorage.getItem('_rt') ? window.localStorage.getItem('_rt') : ''
      // return state.refreshToken
    }
  },
  mutations: {
    refreshLoginConfig (state, config) {
      state.loginConfig = config
    },
    token (state, token) {
      state.accessToken = token
      token ? window.localStorage.setItem('_at', token) : window.localStorage.removeItem('_at')
    },
    tokenType (state, tokenType) {
      state.tokenType = tokenType
      tokenType ? window.localStorage.setItem('_tt', tokenType) : window.localStorage.removeItem('_tt')
    },
    refreshToken (state, token) {
      state.refreshToken = token;
      token ? window.localStorage.setItem('_rt', token) : window.localStorage.removeItem('_rt')
    },
    clearToken (state) {
      state.accessToken = '';
      state.refreshToken = '';
      state.tokenType = '';
      window.localStorage.removeItem('_at')
      window.localStorage.removeItem('_rt')
      window.localStorage.removeItem('_tt')
    },
    refreshUserInfo (state, userInfo) {
      state.userInfo = userInfo
    },
    refreshLoginType (state, type) {
      state.loginType = type
    }
  },
  actions: {
  },
  modules: {
  }
})
