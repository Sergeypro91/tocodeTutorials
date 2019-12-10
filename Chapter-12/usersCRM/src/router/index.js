import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// Pages
import Home from '@/views/Home'
import NotFound from '@/views/404'
import Users from '@/views/Users'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/users',
    name: 'users',
    component: Users
  },
  {
    path: '*',
    name: 'notFound',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
