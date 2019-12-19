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
              <search
                :value="search"
                placeholder="Find your note"
                @search="searching"
              />

              <!-- icon controls -->
              <div class="icons">
                <svg
                  :class="{ active: grid }"
                  @click="gridTrue"
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
                  @click="gridFalse"
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
              @editTitle="editTitle"
              @editDescr="editDescr"
              @escTitle="escTitle"
              @escDescr="escDescr"
              @enterTitle="enterTitle"
              @enterDescr="enterDescr"
              @clickOutside="clickOutside"
              @changeToStandart="changeToStandart"
              @changeToPriority="changeToPriority"
              @changeToImportant="changeToImportant"
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
import { setResizeListeners } from '@/directives/auto-resize.js'

export default {
  components: {
    message,
    newNote,
    notes,
    search
  },

  data() {
    return {}
  },

  created() {
    this.title
  },

  computed: {
    title() {
      return this.$store.getters.getTitle
    },

    message() {
      return this.$store.getters.getMessage
    },

    grid() {
      return this.$store.getters.getGrid
    },

    search() {
      return this.$store.getters.getSearch
    },

    idNouteCount() {
      return this.$store.getters.getIdNouteCount
    },

    clickCounter() {
      return this.$store.getters.getClickCounter
    },

    selectedNote() {
      return this.$store.getters.getSelectedNote
    },

    note() {
      return this.$store.getters.getNote
    },

    notes() {
      return this.$store.getters.getNotes
    },

    notesFilter() {
      let array = this.notes
      let search = this.$store.getters.getSearch

      if (!search) return array

      // Small
      search = search.trim().toLowerCase()

      // Filter
      array = array.filter(function(item) {
        if (
          item.title.toLowerCase().indexOf(search) !== -1 ||
          item.descr.toLowerCase().indexOf(search) !== -1
        ) {
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
      let message = null
      let idNouteCount = this.idNouteCount
      let notes = this.notes

      if (title.trim() === '') {
        let message = 'Title can`t be blank!'

        this.$store.dispatch('setMessage', message)
        return false
      }

      if (descr.trim() === '') {
        descr = title
      }

      if (radioState === '') {
        radioState = this.note.prioritys[0].prioritysType
      }

      notes.push({
        title,
        newTitle: '',
        descr,
        newDescr: '',
        date: new Date(Date.now()).toLocaleString(),
        idNote: this.idNouteCount,
        radioState,
        edit: {
          title: false,
          descr: false
        }
      })
      this.$store.dispatch('getNotes', notes)
      this.note.title = ''
      this.note.newTitle = ''
      this.note.descr = ''
      this.note.newDescr = ''
      this.note.radioState = ''

      idNouteCount++

      this.$store.dispatch('setMessage', message)
      this.$store.dispatch('setIdNouteCount', idNouteCount)
    },

    findNoteIdInArr(index) {
      let notesArrId = this.notes.findIndex(obj => obj.idNote == index)

      return notesArrId
    },

    removeNote(index) {
      let notesArrId = this.findNoteIdInArr(index)

      this.notes.splice(notesArrId, 1)
    },

    gridTrue() {
      this.$store.dispatch('setGrid', true)
    },

    gridFalse() {
      this.$store.dispatch('setGrid', false)
    },

    searching(data) {
      this.$store.dispatch('setSearch', data)
    },

    editTitle(index) {
      let notesArrId = this.findNoteIdInArr(index)
      let notes = this.notes

      notes[notesArrId].newTitle = this.notes[notesArrId].title
      this.$store.dispatch('getNotes', notes)

      if (this.selectedNote === '') {
        let message = ''

        this.$store.dispatch('setMessage', message)
        notes[notesArrId].edit.descr = false
        this.$store.dispatch('getNotes', notes)
        notes[notesArrId].edit.title = !this.notes[notesArrId].edit.title
        this.$store.dispatch('getNotes', notes)
        this.$store.dispatch('setSelectedNote', notesArrId)
      } else if (this.selectedNote === notesArrId) {
        let message = ''

        this.$store.dispatch('setMessage', message)
        notes[this.selectedNote].newTitle = this.notes[notesArrId].title
        this.$store.dispatch('getNotes', notes)
        notes[this.selectedNote].edit.descr = false
        this.$store.dispatch('getNotes', notes)
        notes[this.selectedNote].edit.title = !this.notes[notesArrId].edit.title
        this.$store.dispatch('getNotes', notes)
      } else if (this.selectedNote >= 0) {
        let message = ''

        this.$store.dispatch('setMessage', message)
        notes[this.selectedNote].newTitle = ''
        this.$store.dispatch('getNotes', notes)
        notes[this.selectedNote].newDescr = ''
        this.$store.dispatch('getNotes', notes)
        notes[this.selectedNote].edit.title = false
        this.$store.dispatch('getNotes', notes)
        notes[this.selectedNote].edit.descr = false
        this.$store.dispatch('getNotes', notes)
        notes[notesArrId].edit.title = !this.notes[notesArrId].edit.title
        this.$store.dispatch('getNotes', notes)
        this.$store.dispatch('setSelectedNote', notesArrId)
      }
    },

    escTitle(index) {
      let notesArrId = this.findNoteIdInArr(index)
      let message = ''
      let notes = this.notes

      this.$store.dispatch('setMessage', message)
      notes[notesArrId].newTitle = ''
      this.$store.dispatch('getNotes', notes)
      notes[notesArrId].edit.title = !this.notes[notesArrId].edit.title
      this.$store.dispatch('getNotes', notes)
    },

    enterTitle(index) {
      let notesArrId = this.findNoteIdInArr(index)
      let notes = this.notes

      if (this.notes[notesArrId].newTitle === '') {
        let message = 'Title can`t be blank!'

        this.$store.dispatch('setMessage', message)
      } else {
        let message = ''

        this.$store.dispatch('setMessage', message)
        notes[notesArrId].title = this.notes[notesArrId].newTitle
        this.$store.dispatch('getNotes', notes)
        notes[notesArrId].newTitle = ''
        this.$store.dispatch('getNotes', notes)
        notes[notesArrId].date = new Date(Date.now()).toLocaleString()
        this.$store.dispatch('getNotes', notes)
        notes[notesArrId].edit.title = !this.notes[notesArrId].edit.title
        this.$store.dispatch('getNotes', notes)
      }
    },

    editDescr(index) {
      let notesArrId = this.findNoteIdInArr(index)
      let notes = this.notes

      this.notes[notesArrId].newDescr = this.notes[notesArrId].descr

      if (this.selectedNote === '') {
        let message = ''

        this.$store.dispatch('setMessage', message)
        notes[notesArrId].edit.title = false
        this.$store.dispatch('getNotes', notes)
        notes[notesArrId].edit.descr = !this.notes[notesArrId].edit.descr
        this.$store.dispatch('getNotes', notes)
        this.$store.dispatch('setSelectedNote', notesArrId)
      } else if (this.selectedNote === notesArrId) {
        let message = ''

        this.$store.dispatch('setMessage', message)
        notes[this.selectedNote].newDescr = this.notes[notesArrId].descr
        this.$store.dispatch('getNotes', notes)
        notes[this.selectedNote].edit.title = false
        this.$store.dispatch('getNotes', notes)
        notes[this.selectedNote].edit.descr = !this.notes[notesArrId].edit.descr
        this.$store.dispatch('getNotes', notes)
      } else if (this.selectedNote >= 0) {
        let message = ''

        this.$store.dispatch('setMessage', message)
        notes[this.selectedNote].newDescr = ''
        this.$store.dispatch('getNotes', notes)
        notes[this.selectedNote].newTitle = ''
        this.$store.dispatch('getNotes', notes)
        notes[this.selectedNote].edit.descr = false
        this.$store.dispatch('getNotes', notes)
        notes[this.selectedNote].edit.title = false
        this.$store.dispatch('getNotes', notes)
        notes[notesArrId].edit.descr = !this.notes[notesArrId].edit.descr
        this.$store.dispatch('getNotes', notes)
        this.$store.dispatch('setSelectedNote', notesArrId)
      }
    },

    escDescr(index) {
      let notesArrId = this.findNoteIdInArr(index)
      let message = ''
      let notes = this.notes

      this.$store.dispatch('setMessage', message)
      notes[notesArrId].newDescr = ''
      this.$store.dispatch('getNotes', notes)
      notes[notesArrId].edit.descr = !this.notes[notesArrId].edit.descr
      this.$store.dispatch('getNotes', notes)
    },

    enterDescr(index) {
      let notesArrId = this.findNoteIdInArr(index)
      let notes = this.notes

      if (
        this.notes[notesArrId].newDescr === '' ||
        this.notes[notesArrId].newDescr === '\n'
      ) {
        let message = 'Description can`t be blank!'

        this.$store.dispatch('setMessage', message)
        notes[notesArrId].newDescr = ''
        this.$store.dispatch('getNotes', notes)
      } else {
        let message = ''

        this.$store.dispatch('setMessage', message)
        notes[notesArrId].descr = this.notes[notesArrId].newDescr
        this.$store.dispatch('getNotes', notes)
        notes[notesArrId].newDescr = ''
        this.$store.dispatch('getNotes', notes)
        notes[notesArrId].date = new Date(Date.now()).toLocaleString()
        this.$store.dispatch('getNotes', notes)
        notes[notesArrId].edit.descr = !this.notes[notesArrId].edit.descr
        this.$store.dispatch('getNotes', notes)
      }
    },

    clickOutside(index) {
      let clickCounter = this.$store.getters.getClickCounter
      let notes = this.notes

      if (this.$store.getters.getClickCord === index) {
        clickCounter++

        this.$store.dispatch('setClickCounter', clickCounter)
      } else {
        let clickCord = index

        this.$store.dispatch('setClickCord', clickCord)
        clickCounter = ''
        this.$store.dispatch('setClickCounter', clickCounter)
        clickCounter++
        this.$store.dispatch('setClickCounter', clickCounter)
      }

      if (clickCounter === this.notes.length) {
        for (var i = 0; i < this.notes.length; i++) {
          notes[i].edit.title = false
          this.$store.dispatch('getNotes', notes)
          notes[i].edit.descr = false
          this.$store.dispatch('getNotes', notes)
          let descrHeight = this.$el.querySelectorAll('descr_height')
        }
        let message = ''
        let selectedNote = ''

        this.$store.dispatch('setMessage', message)
        this.$store.dispatch('setSelectedNote', selectedNote)
      }
    },

    changeToStandart(index) {
      let notesArrId = this.findNoteIdInArr(index)
      let notes = this.notes

      notes[notesArrId].radioState = 'standart'
      this.$store.dispatch('getNotes', notes)
    },

    changeToPriority(index) {
      let notesArrId = this.findNoteIdInArr(index)
      let notes = this.notes

      notes[notesArrId].radioState = 'priority'
      this.$store.dispatch('getNotes', notes)
    },

    changeToImportant(index) {
      let notesArrId = this.findNoteIdInArr(index)
      let notes = this.notes

      notes[notesArrId].radioState = 'important'
      this.$store.dispatch('getNotes', notes)
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

<style lang="scss"></style>
