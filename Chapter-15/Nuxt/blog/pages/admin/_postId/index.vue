<template>
  <newPostForm :postEdit="post" @submit="onSubmit" />
</template>

<script>
import newPostForm from '@/components/Admin/NewPostForm.vue'

export default {
  components: { newPostForm },

  layout: 'admin',

  data() {
    return {
      post: {
        id: 1,
        title: '1 post',
        descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        content:
          'Impedit reprehenderit dolorem, alias voluptatem, excepturi pariatur vel eius tempore iure assumenda incidunt ratione porro cupiditate ipsa officia et nesciunt. Reiciendis qui, deleniti ipsa suscipit perferendis optio, sit ab nesciunt repellendus assumenda unde minima totam accusamus eligendi blanditiis dolorum, mollitia maxime minus.',
        img: 'https://lawnuk.com/wp-content/uploads/2016/08/sprogs-dogs.jpg'
      }
    }
  },

  methods: {
    onSubmit(post) {
      console.log('Editing!')
      console.log(post)
    }
  }
}
</script>

<style></style>
