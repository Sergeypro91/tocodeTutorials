export default {
  state: {
    error: null,
    user: {},
    userReg: '',
    userStarsCount: 0,
    repos: []
  },

  mutations: {
    setError(state, payload) {
      state.error = payload
    },

    setUser(state, payload) {
      state.user = payload
    },

    setUserReg(state, payload) {
      state.userReg = payload
    },

    setUserStarsCount(state, payload) {
      state.userStarsCount = payload
    },

    setRepos(state, payload) {
      state.repos = payload
    }
  },

  actions: {
    setError({ commit }, payload) {
      commit('setError', payload)
    },

    setUser({ commit }, payload) {
      commit('setUser', payload)
    },

    setUserReg({ commit }, payload) {
      commit('setUserReg', payload)
    },

    setUserStarsCount({ commit }, payload) {
      commit('setUserStarsCount', payload)
    },

    setRepos({ commit }, payload) {
      commit('setRepos', payload)
    }
  },

  getters: {
    getError(state) {
      return state.error
    },

    getUser(state) {
      return state.user
    },

    getUserReg(state) {
      return state.userReg
    },

    getUserStarsCount(state) {
      return state.userStarsCount
    },

    getRepos(state) {
      return state.repos
    }
  }
}
