<template>
  <div class="wrapper-content wrapper-content--fixed">
    <promo />
    <Intro title="My last posts: " />
    <PostsList :posts="postsLoaded" />
    <contacts />
  </div>
</template>

<script>
import promo from '@/components/Promo.vue'
import contacts from '@/components/Contacts.vue'

export default {
  components: { promo, contacts },

  // asyncData(contex) {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve({
  //         postsLoaded: [
  //           {
  //             id: 1,
  //             title: '1 post',
  //             descr:
  //               'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit reprehenderit dolorem, alias voluptatem, excepturi pariatur vel eius tempore iure assumenda incidunt ratione porro cupiditate ipsa officia et nesciunt. Reiciendis qui, deleniti ipsa suscipit perferendis optio, sit ab nesciunt repellendus assumenda unde minima totam accusamus eligendi blanditiis dolorum, mollitia maxime minus.',
  //             img:
  //               'https://lawnuk.com/wp-content/uploads/2016/08/sprogs-dogs.jpg'
  //           }
  //         ]
  //       })
  //     }, 1500)
  //   })
  //     .then(data => {
  //       return data
  //     })
  //     .catch(e => {
  //       contex.error(e)
  //     })
  // },

  computed: {
    postsLoaded() {
      return this.$store.getters.getPostsLoaded
    }
  },

  data() {
    return {
      posts: []
    }
  }
}
</script>

<style lang="scss"></style>
