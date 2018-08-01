import Vue from 'vue'
import Router from 'vue-router'
import DashBoard from '@/components/Dashboard'
import Login from '@/components/Login'
import AdminPortal from '@/components/AdminPortal'
import NotAuthenticated from '@/components/NotAuthenticated'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashBoard,
      beforeEnter (to, from, next) {
        if (window.sessionStorage.getItem('isLoggedIn')) {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/adminportal',
      name: 'Admin Portal',
      component: AdminPortal,
      beforeEnter (to, from, next) {
        if (window.sessionStorage.getItem('isLoggedIn')) {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/accessdenied',
      name: 'Access denied',
      component: NotAuthenticated
    }
  ]
})
