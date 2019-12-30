<template>
  <section class="contact">
    <div class="container">
      <h2 class="title">Contact me!</h2>

      <!-- Message for input -->
      <Message v-if="message" :message="message" />

      <form @submit.prevent="onSubmit" class="contact-form">
        <!-- Name input -->
        <AppInput v-model="user.name">Name:</AppInput>

        <!-- Email input -->
        <AppInput v-model="user.email" type="email">Email:</AppInput>

        <!-- Textarea -->
        <AppTextArea v-model="user.text">Message:</AppTextArea>

        <!-- Buttons -->
        <div class="controls">
          <AppButton class="btnWhite">Submit!</AppButton>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      message: null,
      user: {
        name: '',
        email: '',
        text: ''
      }
    }
  },

  methods: {
    onSubmit() {
      ;(this.message = 'Submited!'),
        (this.user.name = ''),
        (this.user.email = ''),
        (this.user.text = '')
    }
  }
}
</script>

<style lang="scss">
.contact {
  text-align: center;
  background-color: #4f68f4;
  color: #fff;
  .title {
    color: #fff;
  }
  .contact-form {
    max-width: 600px;
    margin: 30px auto;
  }
  .controls {
    margin: 30px 0;
  }
}
</style>
