export default {
  state: {
    title: 'Notes App',
    message: null,
    grid: true,
    search: '',
    idNouteCount: 6,
    clickCord: '',
    clickCounter: '',
    selectedNote: '',
    note: {
      title: '',
      newTitle: '',
      descr: '',
      radioState: '',
      prioritys: [
        { prioritysType: 'standart' },
        { prioritysType: 'priority' },
        { prioritysType: 'important' }
      ]
    },
    notes: [
      {
        title: 'Firs Note',
        newTitle: '',
        newDescr: '',
        descr: 'Description for first note',
        date: new Date(Date.now()).toLocaleString(),
        idNote: 0,
        edit: {
          title: false,
          descr: false
        },
        radioState: 'standart'
      },

      {
        title: 'Second Note',
        newTitle: '',
        newDescr: '',
        descr:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique facilis dolor, aperiam eveniet assumenda cumque.',
        date: new Date(Date.now()).toLocaleString(),
        idNote: 1,
        edit: {
          title: false,
          descr: false
        },
        radioState: 'priority'
      },

      {
        title: 'Third Note',
        newTitle: '',
        descr:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit pariatur possimus rem officia. Nesciunt aliquam odit reiciendis fugit reprehenderit animi inventore molestias recusandae corporis sit est maxime quos pariatur beatae debitis facere consectetur vitae libero odio in, aliquid quidem, ipsum iure? Autem ut nam fuga voluptatum sit molestiae sint obcaecati eius minima omnis in voluptates, quos corporis aut iusto expedita cumque odit molestias magni sapiente quas eaque deleniti inventore tempore! Pariatur a quaerat enim perferendis, aspernatur porro et nobis. Sint odit quasi, voluptatibus sit, sequi esse sapiente iusto consectetur accusamus quia ratione explicabo perferendis cupiditate totam? Optio voluptatem necessitatibus architecto.',
        newDescr: '',
        date: new Date(Date.now()).toLocaleString(),
        idNote: 2,
        edit: {
          title: false,
          descr: false
        },
        radioState: 'standart'
      },

      {
        title: 'Fourth Note',
        newTitle: '',
        descr:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum quos ducimus pariatur quo eius numquam sapiente doloremque asperiores placeat. Ea accusamus architecto cumque nisi qui officiis? Cumque temporibus nulla iste alias dolorum. Vel quod minus aperiam voluptates. Nemo reprehenderit et labore, sunt neque ullam soluta id, sapiente harum eos provident.',
        newDescr: '',
        date: new Date(Date.now()).toLocaleString(),
        idNote: 3,
        edit: {
          title: false,
          descr: false
        },
        radioState: 'important'
      },

      {
        title: 'Fifth Note',
        newTitle: '',
        descr: 'Description for fifth note',
        newDescr: '',
        date: new Date(Date.now()).toLocaleString(),
        idNote: 4,
        edit: {
          title: false,
          descr: false
        },
        radioState: 'standart'
      },

      {
        title: 'Sixth Note',
        newTitle: '',
        descr:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quis magni labore sunt deserunt incidunt odit fuga. Ad nisi doloribus quasi quidem vero ab laudantium!',
        newDescr: '',
        date: new Date(Date.now()).toLocaleString(),
        idNote: 5,
        edit: {
          title: false,
          descr: false
        },
        radioState: 'standart'
      }
    ]
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
    },

    setNote(state, payload) {
      state.note = payload
    },

    setNotes(state, payload) {
      state.notes = payload
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
    },

    setNote({ commit }, payload) {
      commit('setNote', payload)
    },

    setNotes({ commit }, payload) {
      commit('setNotes', payload)
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
    },

    getNote(state) {
      return state.note
    },

    getNotes(state) {
      return state.notes
    }
  }
}
