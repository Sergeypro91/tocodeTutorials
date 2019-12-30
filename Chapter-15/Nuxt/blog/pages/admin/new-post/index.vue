<template>
  <newPostForm @submit="onSubmit"></newPostForm>
</template>

<script>
import newPostForm from '@/components/Admin/NewPostForm.vue'

export default {
  components: { newPostForm },

  layout: 'admin',

  methods: {
    onSubmit(post) {
      console.log(post)
    }
  }
}
</script>

<style></style>
