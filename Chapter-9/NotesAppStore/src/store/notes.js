export default {
  state: {
    title: 'Notes App',
    message: null
  },
  mutations: {
    setMessage(state, payload) {
      state.message = payload
    }
  },
  actions: {
    setMessage({ commit }, payload) {
      commit('setMessage', payload)
    }
  },
  getters: {
    getTitle(state) {
      return state.title
    },

    getMessage(state) {
      return state.message
    }
  }
}
