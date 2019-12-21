<template>
  <div class="wrapper-content wrapper-content--fixed">
    <section>
      <!-- Search -->
      <div class="container">
        <!-- Serch input -->
        <search
          :value="search"
          placeholder="Type username"
          @search="search = $event"
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

        <!-- User -->
        <div v-if="user" class="user__wrapper">
          <div class="user-avatar">
            <a target="_black" :href="user.html_url">
              <img :src="user.avatar_url" alt="user" />
            </a>
          </div>
          <div class="user-info">
            <h1>{{ user.name }}</h1>
            <span>Registration at: {{ userReg }}</span>
            <div class="user-detail_info">
              <p>Repositories: {{ user.public_repos }}</p>
              <p>Stars: {{ userStarsCount }}</p>
              <p>Followers: {{ user.followers }}</p>
              <p>Following: {{ user.following }}</p>
            </div>
          </div>
        </div>

        <!-- Repo list -->
        <div v-if="repos" class="repos__wrapper">
          <!-- Repo item -->
          <div v-for="repo in repos" :key="repo.id" class="repo-item">
            <div class="repos-info">
              <a class="link" target="_black" :href="repo.html_url">{{
                repo.name
              }}</a>
              <span>{{ repo.stargazers_count }} ⭐</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import search from '@/components/Search.vue'

export default {
  components: { search },

  directives: {
    focus: {
      inserted: function(el) {
        el.focus()
      }
    }
  },

  data() {
    return {
      search: '',
      error: null,
      user: null,
      userReg: '',
      userStarsCount: 0,
      repos: null
    }
  },

  methods: {
    getRepos() {
      this.userStarsCount = 0

      axios.get(`https://api.github.com/users/${this.search}`).then(account => {
        this.user = account.data

        let regexp = this.user.created_at.match(
          /(\d{4})\D(\d{2})\D(\d{2})\D(\d{2})\D(\d{2})\D(\d{2})/
        )

        this.userReg = regexp[3] + '.' + regexp[2] + '.' + regexp[1]
      })

      axios
        .get(`https://api.github.com/users/${this.search}/repos`)
        .then(res => {
          this.repos = res.data
          this.error = null
          this.repos.findIndex(obj => {
            this.userStarsCount += obj.stargazers_count
          })
        })
        .catch(err => {
          console.log(err)

          this.repos = null
          this.error = 'Can`t find this User'
        })
    }
  }
}
</script>

<style lang="scss"></style>
