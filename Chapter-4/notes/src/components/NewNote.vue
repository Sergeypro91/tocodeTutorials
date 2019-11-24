<template>
  <!-- new note -->
  <div class="new-note">
    <div class="new-note__top">
      <div class="new-note__top_title">
        <label>Title</label>
        <input v-model="note.title" type="text" />
      </div>
      <div class="radio">
        <div class="radio-child">
          <label>Standart</label>
          <input type="radio" name="radioType" v-model="note.radioState" :value="note.standart" />
        </div>
        <div class="radio-child">
          <label>Priority</label>
          <input type="radio" name="radioType" v-model="note.radioState" :value="note.priority" />
        </div>
        <div class="radio-child">
          <label>Important</label>
          <input type="radio" name="radioType" v-model="note.radioState" :value="note.important" />
        </div>
      </div>
    </div>
    <label>Description</label>
    <textarea v-model="note.descr"></textarea>
    <button class="btn btnPrimary" @click="addNote">New note</button>
    <!-- <p>{{ this.note.radioState }}</p> -->
  </div>
</template>

<script>
export default {
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  methods: {
    addNote() {
      this.$emit('addNote', this.note)
    }
  }
}
</script>

<style lang="scss">
.new-note {
  text-align: center;
}
.btn {
  margin: 20px;
}
.new-note__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.new-note__top_title {
  flex-grow: 8;
  width: 100%;
}
.radio {
  display: flex;
  min-width: 320px;
  flex-wrap: wrap;
  flex-grow: 2;
  justify-content: space-between;
  align-items: center;
}
.radio-child {
  margin-left: 30px;
  & input {
    height: 21px;
    cursor: pointer;
  }
}
</style>
