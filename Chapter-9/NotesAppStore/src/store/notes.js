export default {
  state: {
    title: 'Notes App',
    message: null,
    grid: true,
    search: '',
    idNouteCount: 6,
    clickCord: '',
    clickCounter: '',
    selectedNote: ''
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
    },

    setIdNouteCount(state, payload) {
      state.idNouteCount = payload
    },

    setClickCord(state, payload) {
      state.clickCord = payload
    },

    setClickCounter(state, payload) {
      state.clickCounter = payload
    },

    setSelectedNote(state, payload) {
      state.selectedNote = payload
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
    },

    setIdNouteCount({ commit }, payload) {
      commit('setIdNouteCount', payload)
    },

    setClickCord({ commit }, payload) {
      commit('setClickCord', payload)
    },

    setClickCounter({ commit }, payload) {
      commit('setClickCounter', payload)
    },

    setSelectedNote({ commit }, payload) {
      commit('setSelectedNote', payload)
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
    },

    getIdNouteCount(state) {
      return state.idNouteCount
    },

    getClickCord(state) {
      return state.clickCord
    },

    getClickCounter(state) {
      return state.clickCounter
    },

    getSelectedNote(state) {
      return state.selectedNote
    }
  }
}
