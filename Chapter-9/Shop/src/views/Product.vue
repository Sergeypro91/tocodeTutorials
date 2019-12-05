<template>
  <div class="wrapper-content wrapper-content--fixed">
    <section>
      <div class="container">
        <h1>Product: {{ id }}</h1>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id
    }
  },
  created() {
    console.log(this.$route)
  }
}
</script>

<style></style>
