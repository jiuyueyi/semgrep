import Vue from 'vue';
import VueRouter from 'vue-router';
import { instance } from '../http/httpConfig';
import store from '../store';
import 'url-search-params-polyfill';

Vue.use(VueRouter);

const routes = [
  {
    'path': '/',
    'redirect': '/login'
  },
  {
    'path': '/login',
    'name': 'login',
    'component': () => import('../views/Login'),
    'meta': {
      'keepAlive': false,
      'title': '登录'
    }
  },
  {
    'path': '/loginCore',
    'name': 'loginCore',
    'component': () => import('../views/template/common/LoginCore'),
    'meta': {
      'keepAlive': false
    }
  },
  {
    'path': '/loginCall',
    'name': 'loginCall'
  },
  {
    'path': '/navigation',
    'name': 'navigation',
    'component': () => import('../views/navigation/Navigation'),
    'meta': {
      'keepAlive': false,
      'title': '信息导航系统'
    }
  },
  {
    'path': '/404',
    'name': '404',
    'component': () => import('../views/errpage/404'),
    'meta': {
      'keepAlive': false,
      'title': '404'
    }
  },
  {
    'path': '/err',
    'name': 'err',
    'component': () => import('../views/errpage/Err'),
    'meta': {
      'keepAlive': false,
      'title': 'err'
    }
  },
  {
    'path': '*',
    'redirect': '/login'
  }
];

const router = new VueRouter({
  'mode': 'history',
  'base': process.env.BASE_URL,
  routes
});

const PUBLIC_ROUTE = ['/login', '/404', '/err'];

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = 'SSO';
  }
  // tk()
  const token = store.getters.getToken;

  if (PUBLIC_ROUTE.includes(to.path)) {
    next();
  } else if (to.path === '/loginCall') {
    // 回调
    var SearchInstance = new URLSearchParams(location.search);
    var tokenKey = SearchInstance.get('YTO-TGC');

    if (!tokenKey || tokenKey === 'null' || tokenKey === 'undefined') {
      store.commit('clearToken');
      next('/login');
    } else {
      instance.get('/ulp-navigation/api/v1.0/token/' + tokenKey).then(res => {
        if (res.data && res.data.data) {
          const tokenData = res.data.data;
          store.commit('token', tokenData.access_token);
          store.commit('refreshToken', tokenData.refresh_token);
          store.commit('tokenType', tokenData.token_type);
          next('/navigation');
        } else {
          store.commit('clearToken');
          next('/login');
        }
      });
    }
  } else if (to.path === '/loginCore') {
    if (to.query && to.query['YTO-TGC']) {
      if (top.location !== self.location) {
        window.parent.postMessage(to.query, '*');
      }
    }
    next();
  } else if (!token || token === 'null' || token === 'undefined') {
    next('/login');
  } else {
    next();
  }
});
/*
function tk () {
  if (!store.getters.getToken) {
    if (window.localStorage.getItem('_at')) {
      store.commit('token', window.localStorage.getItem('_at'))
      window.localStorage.removeItem('_at')
    }
  }
  if (!store.getters.getTokenType) {
    if (window.localStorage.getItem('_tt')) {
      store.commit('tokenType', window.localStorage.getItem('_tt'))
      window.localStorage.removeItem('_tt')
    }
  }
  if (!store.getters.getRefreshToken) {
    if (window.localStorage.getItem('_rt')) {
      store.commit('refreshToken', window.localStorage.getItem('_rt'))
      window.localStorage.removeItem('_rt')
    }
  }
}
*/
export default router;
