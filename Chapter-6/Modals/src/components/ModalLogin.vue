<template>
  <modal title="Login" @close="closeLogin()">
    <div slot="body">
      <form @submit.prevent="onSubmit">
        <!-- email -->
        <div class="form-item" :class="{ errorInput: $v.email.$error }">
          <label>Email:</label>
          <p class="errorText" v-if="!$v.email.required">Field is required!</p>
          <p class="errorText" v-if="!$v.email.email">Email is not correct!</p>
          <input
            v-model="email"
            :class="{ error: $v.email.$error }"
            @change="$v.email.$touch()"
          />
        </div>
        <!-- password -->
        <div class="form-item" :class="{ errorInput: $v.password.$error }">
          <label>Password:</label>
          <p class="errorText" v-if="!$v.password.required">
            Field is required!
          </p>
          <p class="errorText" v-if="!$v.password.minLength">
            Password must have at least
            {{ $v.password.$params.minLength.min }} symbols!
          </p>
          <input
            type="password"
            autocomplete="current-password"
            v-model="password"
            :class="{ error: $v.password.$error }"
            @change="$v.password.$touch()"
          />
        </div>
        <!-- button -->
        <button class="btn btnPrimary">
          Login
        </button>
        <button class="btn btnDefaul" @click.prevent="needToRegistr">
          I need to Registration
        </button>
      </form>
    </div>
  </modal>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'

import modal from '@/components/UI/Modal.vue'

export default {
  components: {
    modal
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  methods: {
    onSubmit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const user = {
          email: this.email,
          password: this.password
        }
        console.log(user)
        this.email = ''
        this.password = ''
        this.$v.$reset()
        this.$emit('close')
      }
    },
    closeLogin() {
      this.email = ''
      this.password = ''
      this.$v.$reset()
      this.$emit('close')
    },
    needToRegistr() {
      this.$emit('needToRegistr')
    }
  }
}
</script>

<style></style>
