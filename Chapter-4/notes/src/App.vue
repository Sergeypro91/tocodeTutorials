<template>
  <div class="wrapper">
    <div class="wrapper-content">
      <section>
        <div class="container">
          <div id="app">
            <!-- message -->
            <message v-if="message" :message="message" />

            <!-- new note -->
            <newNote :note="note" @addNote="addNote" />

            <div class="note-header" style="margin: 36px 0;">
              <!-- title -->
              <h1>{{ title }}</h1>

              <!-- search -->
              <search :value="search" placeholder="Find your note" @search="search = $event" />

              <!-- icon controls -->
              <div class="icons">
                <svg
                  :class="{ active: grid }"
                  @click="grid = true"
                  style="cursor: pointer;"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
                <svg
                  :class="{ active: !grid }"
                  @click="grid = false"
                  style="cursor: pointer;"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3" y2="6" />
                  <line x1="3" y1="12" x2="3" y2="12" />
                  <line x1="3" y1="18" x2="3" y2="18" />
                </svg>
              </div>
            </div>

            <!-- note list -->
            <notes :notes="notesFilter" :grid="grid" @remove="removeNote" style="margin: 36px 0;" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import message from '@/components/Message.vue'
import newNote from '@/components/NewNote.vue'
import notes from '@/components/Notes.vue'
import search from '@/components/Search.vue'

export default {
  components: {
    message,
    newNote,
    notes,
    search
  },
  data() {
    return {
      title: 'Notes App',
      message: null,
      grid: true,
      search: '',
      placeholder: '',
      note: {
        title: '',
        descr: ''
      },
      notes: [
        {
          title: 'Firs Note',
          descr: 'Description for first note',
          date: new Date(Date.now()).toLocaleString(),
          idNote: 0
        },
        {
          title: 'Second Note',
          descr: 'Description for second note',
          date: new Date(Date.now()).toLocaleString(),
          idNote: 1
        },
        {
          title: 'Third Note',
          descr: 'Description for third note',
          date: new Date(Date.now()).toLocaleString(),
          idNote: 2
        }
      ]
    }
  },
  computed: {
    notesFilter() {
      let array = this.notes,
        search = this.search
      if (!search) return array
      //Small
      search = search.trim().toLowerCase()
      //Filter
      array = array.filter(function(item) {
        if (item.title.toLowerCase().indexOf(search) !== -1) {
          return item
        }
      })
      // Error
      return array
    }
  },
  methods: {
    addNote() {
      let { title, descr } = this.note
      let idNote = 0

      if (this.notes.length > 0) {
        idNote = this.notes[this.notes.length - 1].idNote + 1
      }

      if (title === '') {
        this.message = 'Title can`t be blank!'
        return false
      }

      this.notes.push({
        title,
        descr,
        idNote,
        date: new Date(Date.now()).toLocaleString()
      })

      this.note.title = ''
      this.note.descr = ''

      this.message = null
    },
    removeNote(index) {
      let notesArrId = this.notes.findIndex(obj => obj.idNote == index)
      // console.log(notesArrId)
      this.notes.splice(notesArrId, 1)
    }
  }
}
</script>

<style></style>
