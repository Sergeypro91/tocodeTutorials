<template>
  <div class="wrapper-content wrapper-content--fixed">
    <post :post="post" />
    <comments :comments="comments" />
    <newComment />
  </div>
</template>

<script>
import post from '@/components/Blog/Post.vue'
import newComment from '@/components/Comments/NewComment.vue'
import comments from '@/components/Comments/Comments.vue'

export default {
  components: { post, comments, newComment },

  data() {
    return {
      post: {
        id: 1,
        title: '1 post',
        descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        content:
          'Impedit reprehenderit dolorem, alias voluptatem, excepturi pariatur vel eius tempore iure assumenda incidunt ratione porro cupiditate ipsa officia et nesciunt. Reiciendis qui, deleniti ipsa suscipit perferendis optio, sit ab nesciunt repellendus assumenda unde minima totam accusamus eligendi blanditiis dolorum, mollitia maxime minus.',
        img: 'https://lawnuk.com/wp-content/uploads/2016/08/sprogs-dogs.jpg'
      },

      comments: [
        { name: 'Alex', text: 'Some type of comments liave users on site' },
        { name: 'Sergey', text: 'Second comments for test' }
      ]
    }
  }
}
</script>

<style lang="scss">
.post {
  max-width: 900px;
  margin: 0 auto;
}

.post-header {
  text-align: center;
  margin-bottom: 30px;
  img {
    max-width: 400px;
    margin-bottom: 16px;
  }
  p {
    color: #999;
  }
}

.post-body {
  text-align-last: left;
}
</style>
