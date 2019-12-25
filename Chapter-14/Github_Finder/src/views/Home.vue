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
        <button
          v-if="pageCount.length == 0"
          class="btn btnPrimary"
          @click="getRepos"
        >
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
          :repos-sort="reposSort"
          :page="page"
          :page-count="pageCount"
          @sort="sort"
          @loadMore="loadMore"
          @firstPage="firstPage"
          @prevPage="prevPage"
          @nextPage="nextPage"
          @lastPage="lastPage"
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

  data() {
    return {
      currentSort: 'name',
      currentSortDir: 'asc',
      page: {
        current: 1,
        length: 5
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
    },

    reposSort() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.repos
        .sort((a, b) => {
          let mod = 1
          if (this.currentSortDir === 'desc') mod = -1
          if (a[this.currentSort] < b[this.currentSort]) return -1 * mod
          if (a[this.currentSort] > b[this.currentSort]) return 1 * mod
          return 0
        })
        .filter((row, index) => {
          let start = (this.page.current - 1) * this.page.length
          let end = this.page.current * this.page.length
          if (index >= start && index < end) return true
        })
    },

    pageCount() {
      let reposPage = this.repos.length / this.page.length
      let array = []

      for (let i = 1; i <= Math.ceil(reposPage); i++) {
        array.push(i)
        this.$store.dispatch('setPageCount', array)
      }

      console.log(this.$store.getters.getPageCount.length)

      return this.$store.getters.getPageCount
    }
  },

  methods: {
    searching(data) {
      this.$store.dispatch('setSearch', data)
    },

    sort(e) {
      if (e === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      }
      this.currentSort = e
    },

    // loadMore
    loadMore() {
      this.page.length += 5
      this.page.current = Math.ceil(this.page.current / 2)
    },

    // Pagination
    firstPage() {
      if (this.page.current > 1) this.page.current = 1
    },
    prevPage() {
      if (this.page.current > 1) this.page.current -= 1
    },
    nextPage() {
      if (this.page.current * this.page.length < this.repos.length)
        this.page.current += 1
    },
    lastPage() {
      if (this.page.current * this.page.length < this.repos.length)
        this.page.current = this.pageCount.length
    },

    getRepos() {
      let userStarsCount = 0
      this.pageCount = []

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
        .get(
          `https://api.github.com/users/${this.search}/repos?page=1&per_page=1000`
        )
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
          let repos = []

          this.$store.dispatch('setRepos', repos)
          this.$store.dispatch('setError', error)
        })
    }
  }
}
</script>

<style lang="scss"></style>
