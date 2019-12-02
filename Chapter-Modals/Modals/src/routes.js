import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// Pages
import Home from '@/pages/Home'
import DZ21 from '@/pages/DZ2-1'
import DZ22 from '@/pages/DZ2-2'

// Routering
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/dz2-1',
      name: 'dz2-1',
      component: DZ21
    },
    {
      path: '/dz2-2',
      name: 'dz2-2',
      component: DZ22
    }
  ]
})
