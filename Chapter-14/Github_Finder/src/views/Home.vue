<template>
  <div class="wrapper-content wrapper-content--fixed">
    <section>
      <div class="container">
        <!-- Search components -->
        <search
          :value="search"
          placeholder="Type username"
          @search="searching"
        />

        <!-- Error -->
        <div v-if="error" class="error">
          <p>{{ error }}</p>
        </div>

        <!-- Search button -->
        <button v-if="!repos" class="btn btnPrimary" @click="getRepos">
          Search
        </button>
        <button v-else class="btn btnPrimary" @click="getRepos">
          Search again!
        </button>

        <!-- User components -->
        <user
          :user="user"
          :user-reg="userReg"
          :user-stars-count="userStarsCount"
          :repos="repos"
        />
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import search from '@/components/Search.vue'
import user from '@/components/UserInfo.vue'

export default {
  components: { search, user },

  directives: {
    focus: {
      inserted: function(el) {
        el.focus()
      }
    }
  },

  computed: {
    search() {
      return this.$store.getters.getSearch
    },

    error() {
      return this.$store.getters.getError
    },

    user() {
      return this.$store.getters.getUser
    },

    userReg() {
      return this.$store.getters.getUserReg
    },

    userStarsCount() {
      return this.$store.getters.getUserStarsCount
    },

    repos() {
      return this.$store.getters.getRepos
    }
  },

  methods: {
    searching(data) {
      this.$store.dispatch('setSearch', data)
    },

    getRepos() {
      let userStarsCount = 0

      this.$store.dispatch('setUserStarsCount', userStarsCount)

      axios.get(`https://api.github.com/users/${this.search}`).then(account => {
        let user = account.data

        this.$store.dispatch('setUser', user)

        let regexp = user.created_at.match(
          /(\d{4})\D(\d{2})\D(\d{2})\D(\d{2})\D(\d{2})\D(\d{2})/
        )

        let userReg = regexp[3] + '.' + regexp[2] + '.' + regexp[1]

        this.$store.dispatch('setUserReg', userReg)
      })

      axios
        .get(`https://api.github.com/users/${this.search}/repos`)
        .then(res => {
          let error = null
          let repos = res.data

          this.$store.dispatch('setRepos', repos)
          this.$store.dispatch('setError', error)
          repos.findIndex(obj => {
            userStarsCount += obj.stargazers_count

            this.$store.dispatch('setUserStarsCount', userStarsCount)
          })
          this.$store.dispatch('setRepos', repos)
        })
        .catch(err => {
          console.log(err)
          let error = 'Can`t find this User'
          let repos = null

          this.$store.dispatch('setRepos', repos)
          this.$store.dispatch('setError', error)
        })
    }
  }
}
</script>

<style lang="scss"></style>
