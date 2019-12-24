<template>
  <div class="wrapper-content wrapper-content--fixed">
    <section>
      <div class="container">
        <h1>Notify page</h1>
        <!-- Table -->
        <table>
          <!-- Table Head -->
          <thead>
            <tr>
              <th @click="sort('name')">Name &#8595;</th>
              <th @click="sort('age')">Age &#8595;</th>
              <th @click="sort('gender')">Gender &#8595;</th>
            </tr>
          </thead>

          <!-- Table Body -->
          <tbody>
            <tr v-for="user in notifySort" :key="user.id">
              <td>
                <img :src="user.img" :alt="user.name" />
                <span>{{ user.name }}</span>
              </td>
              <td>{{ user.age }}</td>
              <td>{{ user.gender }}</td>
            </tr>
          </tbody>
        </table>
        <div style="text-align: center;">
          <span>debug: sort: {{ currentSort }}, dir: {{ currentSortDir }}</span>
          <p>page: {{ this.page.current }}, length: {{ this.page.length }}</p>
        </div>
      </div>
    </section>

    <!-- Button -->
    <section>
      <div class="container">
        <div class="button-list">
          <div class="btn btnPrimary" @click="prevPage">&#8592;</div>
          <div class="btn btnPrimary" @click="nextPage">&#8594;</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      notify: [],
      currentSort: 'name',
      currentSortDir: 'asc',
      page: {
        current: 1,
        length: 3
      }
    }
  },

  computed: {
    notifySort() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.notify
        .sort((a, b) => {
          let mod = 1
          if (this.currentSortDir === 'desc') mod = -1
          if (a[this.currentSort] < b[this.currentSort]) return -1 * mod
          if (a[this.currentSort] > b[this.currentSort]) return 1 * mod
          return 0
        })
        .filter((row, index) => {
          let start = (this.page.current - 1) * this.page.length
          let end = this.page.current * this.page.length
          if (index >= start && index < end) return true
        })
    }
  },

  created() {
    axios
      .get('https://api.myjson.com/bins/rzgya')
      .then(response => {
        // console.log(response.data)
        this.notify = response.data
      })
      .catch(error => {
        console.log(error)
      })
  },

  methods: {
    sort(e) {
      if (e === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      }
      this.currentSort = e
    },
    // Pagination
    prevPage() {
      if (this.page.current > 1) this.page.current -= 1
    },
    nextPage() {
      if (this.page.current * this.page.length < this.notify.length)
        this.page.current += 1
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  width: 60px;
  height: auto;
  border-radius: 50%;
  margin-right: 16px;
}

.button-list {
  width: 100%;
  text-align: center;

  .btn {
    margin: 0 20px;
  }
}
</style>
