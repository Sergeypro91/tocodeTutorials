<template>
  <section class="new-comment">
    <div class="container">
      <h2 class="title">New Comment:</h2>

      <!-- Message for input -->
      <Message v-if="message" :message="message" />

      <form @submit.prevent="onSubmit" class="contact-form">
        <!-- Name input -->
        <AppInput v-model="comment.name">Name:</AppInput>

        <!-- Textarea -->
        <AppTextArea v-model="comment.text">Message:</AppTextArea>

        <!-- Buttons -->
        <div class="controls">
          <AppButton>Submit!</AppButton>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    postId: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      message: null,
      comment: {
        name: '',
        text: ''
      }
    }
  },

  methods: {
    onSubmit() {
      this.$store
        .dispatch('addComment', {
          postId: this.postId,
          publish: false,
          ...this.comment
        })
        .then(() => {
          this.message = 'Success!'
          this.comment.name = ''
          this.comment.text = ''
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>

<style lang="scss">
.new-comment {
  text-align: center;
  .contact-form {
    max-width: 600px;
    margin: 30px auto;
  }
  .controls {
    margin: 30px 0;
  }
}
</style>
