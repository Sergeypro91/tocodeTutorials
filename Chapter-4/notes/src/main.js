import Vue from 'vue'
import App from './App.vue'

import './directives/focus.js'
// import './directives/click-outside.js'

import './assets/scss/main.scss'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
