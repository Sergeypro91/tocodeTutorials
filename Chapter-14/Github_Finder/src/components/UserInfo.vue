<template>
  <div v-if="repos" class="wrapper__search">
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
      required: false
    }
  }
}
</script>

<style></style>
