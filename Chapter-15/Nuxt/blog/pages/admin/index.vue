<template>
  <PostsList :admin="true" :posts="posts" />
</template>

<script>
import promo from '@/components/Promo.vue'
import contacts from '@/components/Contacts.vue'

export default {
  layout: 'admin',

  data() {
    return {
      posts: [
        {
          id: 1,
          title: '1 post',
          descr:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit reprehenderit dolorem, alias voluptatem, excepturi pariatur vel eius tempore iure assumenda incidunt ratione porro cupiditate ipsa officia et nesciunt. Reiciendis qui, deleniti ipsa suscipit perferendis optio, sit ab nesciunt repellendus assumenda unde minima totam accusamus eligendi blanditiis dolorum, mollitia maxime minus.',
          img: 'https://lawnuk.com/wp-content/uploads/2016/08/sprogs-dogs.jpg'
        },

        {
          id: 2,
          title: '2 post',
          descr:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit reprehenderit dolorem, alias voluptatem, excepturi pariatur vel eius tempore iure assumenda incidunt ratione porro cupiditate ipsa officia et nesciunt. Reiciendis qui, deleniti ipsa suscipit perferendis optio, sit ab nesciunt repellendus assumenda unde minima totam accusamus eligendi blanditiis dolorum, mollitia maxime minus.',
          img:
            'https://iheartdogs.com/wp-content/uploads/2017/09/Brite-Bite-0021-2.jpg'
        },

        {
          id: 3,
          title: '3 post',
          descr:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit reprehenderit dolorem, alias voluptatem, excepturi pariatur vel eius tempore iure assumenda incidunt ratione porro cupiditate ipsa officia et nesciunt. Reiciendis qui, deleniti ipsa suscipit perferendis optio, sit ab nesciunt repellendus assumenda unde minima totam accusamus eligendi blanditiis dolorum, mollitia maxime minus.',
          img:
            'https://dsvf96nw4ftce.cloudfront.net/images/detailed/2/thundercap-calming-cap-action4.jpg'
        }
      ]
    }
  }
}
</script>

<style></style>
