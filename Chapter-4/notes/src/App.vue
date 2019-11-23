<template>
  <div class="wrapper">
    <div class="wrapper-content">
      <section>
        <div class="container">
          <div id="app">
            <h1 class="title">{{ title }}</h1>

            <!-- message -->
            <message v-if="message" :message="message" />

            <!-- new note -->
            <newNote :note="note" @addNote="addNote" />

            <div class="note-header" style="margin: 36px 0;">
              <!-- title -->
              <h1 class="title" style="margin: 0">Notes</h1>

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
            <notes
              :notes="notesFilter"
              :grid="grid"
              @remove="removeNote"
              @edit="editTitle"
              @esc="escEdit"
              @enter="enterEdit"
              style="margin: 36px 0;"
            />
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
      idNouteCount: 3,
      note: {
        title: '',
        newTitle: '',
        descr: '',
        radioState: '',
        standart: 'standart',
        priority: 'priority',
        important: 'important'
      },
      notes: [
        {
          title: 'Firs Note',
          newTitle: '',
          descr: 'Description for first note',
          date: new Date(Date.now()).toLocaleString(),
          idNote: 0,
          edit: false,
          radioState: 'standart'
        },
        {
          title: 'Second Note',
          newTitle: '',
          descr: 'Description for second note',
          date: new Date(Date.now()).toLocaleString(),
          idNote: 1,
          edit: false,
          radioState: 'standart'
        },
        {
          title: 'Third Note',
          newTitle: '',
          descr: 'Description for third note',
          date: new Date(Date.now()).toLocaleString(),
          idNote: 2,
          edit: false,
          radioState: 'standart'
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
      let { title, descr, radioState } = this.note

      if (title === '') {
        this.message = 'Title can`t be blank!'
        return false
      }

      if (radioState === '') {
        radioState = this.note.standart
      }

      this.notes.push({
        title,
        newTitle: '',
        descr,
        date: new Date(Date.now()).toLocaleString(),
        idNote: this.idNouteCount++,
        radioState,
        edit: false
      })

      this.note.title = ''
      this.note.newTitle = ''
      this.note.descr = ''
      this.note.radioState = ''

      this.message = null
    },
    removeNote(index) {
      let notesArrId = this.notes.findIndex(obj => obj.idNote == index)

      this.notes.splice(notesArrId, 1)
    },
    editTitle(index) {
      let notesArrId = this.notes.findIndex(obj => obj.idNote == index)

      this.notes[notesArrId].edit = !this.notes[notesArrId].edit
    },
    escEdit(index) {
      console.log('Exit from Edit')
      let notesArrId = this.notes.findIndex(obj => obj.idNote == index)

      this.notes[notesArrId].newTitle = ''
      this.notes[notesArrId].edit = !this.notes[notesArrId].edit
    },
    enterEdit(index) {
      console.log('Enter Edit to data')
      let notesArrId = this.notes.findIndex(obj => obj.idNote == index)

      this.notes[notesArrId].title = this.notes[notesArrId].newTitle
      this.notes[notesArrId].newTitle = ''
      this.notes[notesArrId].date = new Date(Date.now()).toLocaleString()
      this.notes[notesArrId].edit = !this.notes[notesArrId].edit
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus()
      }
    }
  }
}
</script>

<style lang="scss">
p {
  word-break: break-word;
}
input,
textarea {
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
}
input:focus,
textarea:focus {
  border: #494ce8 solid 1px;
  transition-delay: 0s !important;
}
</style>
