<template>
  <PostsList :admin="true" :posts="postsLoaded" />
</template>

<script>
import promo from '@/components/Promo.vue'
import contacts from '@/components/Contacts.vue'

export default {
  layout: 'admin',

  computed: {
    postsLoaded() {
      return this.$store.getters.getPostsLoaded
    }
  }
}
</script>

<style></style>
