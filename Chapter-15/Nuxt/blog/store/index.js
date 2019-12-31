import axios from 'axios'

export const state = () => ({
  postsLoaded: []
})

export const mutations = {
  setPosts(state, posts) {
    state.postsLoaded = posts
  },

  addPost(state, post) {
    console.log(post)
    state.postsLoaded.push(post)
  },

  editPost(state, postEdit) {
    const postIndex = state.postsLoaded.findIndex(
      post => post.id === postEdit.id
    )
    state.postsLoaded[postIndex] = postEdit
  }
}

export const actions = {
  nuxtServerInit({ commit }, contex) {
    return axios
      .get('https://tocode-blog-nuxt.firebaseio.com/posts.json')
      .then(res => {
        console.log(res)
        const postsArray = []

        for (let key in res.data) {
          postsArray.push({ ...res.data[key], id: key })
        }

        commit('setPosts', postsArray)
      })
      .catch(e => console.log(e))
  },

  addPost({ commit }, post) {
    return axios
      .post('https://tocode-blog-nuxt.firebaseio.com/posts.json', post)
      .then(res => {
        commit('addPost', { ...post, id: res.data.name })
      })
      .catch(e => console.log(e))
  },

  editPost({ commit }, post) {
    return axios
      .put(
        `https://tocode-blog-nuxt.firebaseio.com/posts/${post.id}.json`,
        post
      )
      .then(res => {
        commit('editPost', post)
      })
      .catch(e => console.log(e))
  }
}

export const getters = {
  getPostsLoaded(state) {
    return state.postsLoaded
  }
}
