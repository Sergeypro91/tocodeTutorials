<template>
  <div class="wrapper">
    <div class="wrapper-content">
      <section>
        <div class="container">
          <div id="app">
            <h1>{{ title }}</h1>

            <message v-if="message" :message="message" />

            <!-- new note -->
            <div class="new-note">
              <input v-model="note.title" type="text" />
              <textarea v-model="note.descr"></textarea>
              <button @click="addNote">New note</button>
            </div>

            <!-- note list -->
            <div class="notes" v-for="(note, index) in notes" :key="index">
              <div class="note-header">
                <p>
                  {{ note.title }}
                </p>
              </div>
              <div class="note-body">
                <p>{{ note.descr }}</p>
                <span>{{ note.date }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import message from '@/components/Message.vue'

export default {
  components: {
    message
  },
  data() {
    return {
      title: 'Notes App',
      message: null,
      note: {
        title: '',
        descr: ''
      },
      notes: [
        {
          title: 'Firs Note',
          descr: 'Description for first note',
          date: new Date(Date.now()).toLocaleString()
        },
        {
          title: 'Second Note',
          descr: 'Description for second note',
          date: new Date(Date.now()).toLocaleString()
        },
        {
          title: 'Third Note',
          descr: 'Description for third note',
          date: new Date(Date.now()).toLocaleString()
        }
      ]
    }
  },
  methods: {
    addNote() {
      let { title, descr } = this.note

      if (title === '') {
        this.message = 'Title can`t be blank!'
        return false
      }

      this.notes.push({
        title,
        descr,
        date: new Date(Date.now()).toLocaleString()
      })

      this.note.title = ''
      this.note.descr = ''

      this.message = null
    }
  }
}
</script>

<style></style>
