import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    message: 'Hello Vuex!'
  },
  mutations: {
    setMessage(state) {
      state.message = 'Hello again'
    }
  },
  actions: {
    setMessage({ commit }) {
      commit('setMessage')
    }
  },
  getters: {}
})
