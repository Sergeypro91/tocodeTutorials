<template>
  <div class="wrapper-content wrapper-content--fixed">
    <section>
      <div class="container">
        <!-- Login -->
        <button class="btn btnPrimary" @click="modalLogin = !modalLogin">
          Login
        </button>
        <modalLogin
          v-show="modalLogin"
          @close="modalLogin = false"
          @needToRegistr=";(modalLogin = false), (modalRegistration = true)"
        >
        </modalLogin>

        <!-- Registration -->
        <button
          class="btn btnPrimary"
          @click="modalRegistration = !modalRegistration"
        >
          Registration
        </button>
        <modalRegistration
          v-show="modalRegistration"
          @close="modalRegistration = false"
        >
        </modalRegistration>
      </div>
    </section>
  </div>
</template>

<script>
import modalLogin from '@/components/ModalLogin.vue'
import modalRegistration from '@/components/ModalRegistration.vue'

export default {
  components: {
    modalLogin,
    modalRegistration
  },
  data() {
    return {
      modalLogin: false,
      modalRegistration: false
    }
  }
}
</script>

<style></style>
