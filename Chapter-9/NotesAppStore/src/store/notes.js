export default {
  state: {
    title: 'Notes App',
    message: null,
    grid: true,
    search: ''
  },

  mutations: {
    setMessage(state, payload) {
      state.message = payload
    },

    setGrid(state, payload) {
      state.grid = payload
    },

    setSearch(state, payload) {
      state.search = payload
    }
  },

  actions: {
    setMessage({ commit }, payload) {
      commit('setMessage', payload)
    },

    setGrid({ commit }, payload) {
      commit('setGrid', payload)
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

    getGrid(state) {
      return state.grid
    },

    getSearch(state) {
      return state.search
    }
  }
}
