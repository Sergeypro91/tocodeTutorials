<template>
  <div v-if="!repos.length == 0" class="user-block">
    <!-- User -->
    <div class="user__wrapper">
      <!-- User avatar-->
      <div class="user-avatar">
        <a target="_black" :href="user.html_url">
          <img :src="user.avatar_url" alt="user" />
        </a>
      </div>

      <!-- User info-->
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
    <div class="repos__wrapper">
      <!-- Repo sort -->
      <div class="repo-sort">
        <p>Sort by:</p>
        <div class="repo-sor__group">
          <span @click="sort('name')">Name &#8595;</span>
          <span @click="sort('stargazers_count')">Stars &#8595;</span>
        </div>
      </div>

      <!-- Repo item -->
      <div v-for="repo in reposSort" :key="repo.id" class="repo-item">
        <a class="link" target="_black" :href="repo.html_url">
          <div class="repos-info">
            <p>{{ repo.name }}</p>
            <span>{{ repo.stargazers_count }} ⭐</span>
          </div>
        </a>
      </div>
    </div>

    <!-- Pagination wrapper -->
    <div v-if="pageCount.length > 1" class="pagination__wrapper">
      <!-- Load more -->
      <button class="btn btnPrimary" @click="loadMore">
        Load more
      </button>

      <!-- Pagination -->
      <div class="container">
        <div class="button-list">
          <div class="btn btnPrimary" @click="prevPage">&#8592;</div>

          <!-- Number repos page -->
          <div class="reposNumberPage">
            <span
              v-if="!(pageCount[0] === pageCount[page.current - 1])"
              @click="firstPage"
              >{{ pageCount[0] }}</span
            >
            <span
              v-if="
                !(
                  pageCount[0] === pageCount[page.current - 1] ||
                  pageCount[page.current - 2] === pageCount[0]
                )
              "
              @click="prevPage"
              >{{ pageCount[page.current - 2] }}</span
            >
            <span class="current-page">
              {{ pageCount[page.current - 1] }}
            </span>
            <span
              v-if="
                !(
                  pageCount[page.current - 1] ===
                    pageCount[pageCount.length - 2] ||
                  pageCount[page.current] === pageCount[pageCount.length]
                )
              "
              @click="nextPage"
              >{{ pageCount[page.current] }}</span
            >
            <span
              v-if="
                !(
                  pageCount[page.current] === pageCount[pageCount.length] ||
                  pageCount[page.current - 1] === pageCount[pageCount.length]
                )
              "
              @click="lastPage"
              >{{ pageCount.length }}</span
            >
          </div>

          <div class="btn btnPrimary" @click="nextPage">&#8594;</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    },
    userReg: {
      type: String,
      required: true
    },
    userStarsCount: {
      type: Number,
      required: true
    },
    repos: {
      type: Array,
      required: true
    },
    reposSort: {
      type: Array,
      required: true
    },
    pageCount: {
      type: Array,
      required: true
    },
    page: {
      type: Object,
      required: true
    }
  },

  methods: {
    sort(index) {
      this.$emit('sort', index)
    },

    loadMore() {
      this.$emit('loadMore')
    },

    firstPage() {
      this.$emit('firstPage')
    },

    prevPage() {
      this.$emit('prevPage')
    },

    nextPage() {
      this.$emit('nextPage')
    },

    lastPage() {
      this.$emit('lastPage')
    }
  }
}
</script>

<style></style>
