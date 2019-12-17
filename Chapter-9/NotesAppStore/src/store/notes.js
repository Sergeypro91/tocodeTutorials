export default {
  state: {
    title: 'Notes App',
    message: null,
    search: ''
  },

  mutations: {
    setMessage(state, payload) {
      state.message = payload
    },

    setSearch(state, payload) {
      state.search = payload
    }
  },

  actions: {
    setMessage({ commit }, payload) {
      commit('setMessage', payload)
    },

    setSearch({ commit }, payload) {
      commit('setSearch', payload)
    }
  },

  getters: {
    getTitle(state) {
      return state.title
    },

    getMessage(state) {
      return state.message
    },

    getSearch(state) {
      return state.search
    }
  }
}
