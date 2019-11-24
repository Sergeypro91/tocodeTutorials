<template>
  <div class="message">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.message {
  display: flex;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  div {
    margin: auto;
    color: white;
    background: #ff5252;
    padding: 16px;
    border-radius: 4px;
  }
}
</style>
