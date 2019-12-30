import Vue from 'vue'
import VueRouter from 'vue-router'
// Pages
import Home from '@/views/Home.vue'
import NotFound from '@/views/404'
import Notify from '@/views/NotifyPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/notify',
    name: 'notify',
    component: Notify
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
