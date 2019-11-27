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
          <label>
            <input
              id="radio-button-child"
              type="radio"
              name="radioType"
              v-model="note.radioState"
              :value="note.standart"
            />
            <span>Standart</span>
          </label>
        </div>
        <div class="radio-child">
          <label>
            <input
              id="radio-button-child"
              type="radio"
              name="radioType"
              v-model="note.radioState"
              :value="note.priority"
            />
            <span>Priority</span>
          </label>
        </div>
        <div class="radio-child">
          <label>
            <input
              id="radio-button-child"
              type="radio"
              name="radioType"
              v-model="note.radioState"
              :value="note.important"
            />
            <span>Important</span>
          </label>
        </div>
      </div>
    </div>
    <label>Description</label>
    <textarea rows="4" v-model="note.descr"></textarea>
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

<style lang="scss"></style>
