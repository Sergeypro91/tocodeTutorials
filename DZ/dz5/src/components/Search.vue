<template>
  <div class="wrapper__search">
    <!-- Search -->
    <div class="search">
      <div class="search-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-search"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>
    </div>

    <!-- Search input -->
    <input v-model="search" v-focus type="text" :placeholder="placeholder" />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: 'Search'
    }
  },

  data() {
    return { search: this.value }
  },

  watch: {
    search(val) {
      // console.log(val)
      this.$emit('search', val)
    }
  }
}
</script>

<style scoped></style>
