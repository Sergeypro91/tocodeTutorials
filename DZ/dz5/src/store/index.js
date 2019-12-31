import Vue from 'vue'
import Vuex from 'vuex'

import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { user },

  state: {
    search: ''
  },

  mutations: {
    setSearch(state, payload) {
      state.search = payload
    }
  },

  actions: {
    setSearch({ commit }, payload) {
      commit('setSearch', payload)
    }
  },

  getters: {
    getSearch(state) {
      return state.search
    }
  }
})
