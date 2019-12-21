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
      repos: null
    }
  },

  methods: {
    getRepos() {
      axios
        .get(`https://api.github.com/users/${this.search}/repos`)
        .then(res => {
          console.log(res)

          this.repos = res.data
          this.error = null
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

<style lang="scss">
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
}

button {
  margin-top: 40px !important;
}

.repos__wrapper {
  width: 400px;
  margin: 30px 0;
}

.repos-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #dbdbdb;
}

.error {
  margin-top: 20px;
}
</style>
