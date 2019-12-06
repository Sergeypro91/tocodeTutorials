import Vue from 'vue'
import App from './App.vue'

import './directives/focus.js'
import './assets/scss/main.scss'
import store from './store'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
