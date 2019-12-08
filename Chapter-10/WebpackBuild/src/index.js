import './js/common'
import './scss/main.scss'
import './css/main.css'

// import 'vue'
// import Vue from 'vue'
window.Vue = require('vue')
import store from './store'

Vue.component('example-component', require('./components/Example.vue').default)

const app = new Vue({
  store,
  el: '#app'
})
