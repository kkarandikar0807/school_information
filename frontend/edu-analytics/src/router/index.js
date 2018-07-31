import Vue from 'vue'
import Router from 'vue-router'
import DashBoard from '@/components/Dashboard'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashBoard
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    }
  ]
})
