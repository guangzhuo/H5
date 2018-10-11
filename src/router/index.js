import Vue from 'vue'
import Router from 'vue-router'
import util from '@/plugin'
import store from '@/store'

import Login from '@/view/Login'
import Defect from  '@/view/Defect'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: '/',
  routes: [{
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },

    {
      path: "*",
      name: '404',
      component: Defect
    }
  ]
})

router.beforeEach((to, from, next) => {
  let token = util.getCookie('loginToken')

  // 如果有在已经登录的情况下 导航到登录页面
  // 就重定向到首页
  if (to.path === '/login' && token) {
    next({
      name: 'Index'
    })
    return
  }

  // 需要登录路由
  if (to.matched.some(record => record.meta.requiresAuth)) {
    store.dispatch('getUser').then((data = {}) => {
      if (data.userNm) {
        next()
      } else {
        next({
          name: 'Login'
        })
      }
    })
  } else {
    next()
  }
})
export default router
