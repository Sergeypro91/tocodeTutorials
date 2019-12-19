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
    return {
      note: {
        title: '',
        newTitle: '',
        descr: '',
        radioState: '',
        prioritys: [
          { prioritysType: 'standart' },
          { prioritysType: 'priority' },
          { prioritysType: 'important' }
        ]
      },
      notes: [
        {
          title: 'Firs Note',
          newTitle: '',
          newDescr: '',
          descr: 'Description for first note',
          date: new Date(Date.now()).toLocaleString(),
          idNote: 0,
          edit: {
            title: false,
            descr: false
          },
          radioState: 'standart'
        },

        {
          title: 'Second Note',
          newTitle: '',
          newDescr: '',
          descr:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique facilis dolor, aperiam eveniet assumenda cumque.',
          date: new Date(Date.now()).toLocaleString(),
          idNote: 1,
          edit: {
            title: false,
            descr: false
          },
          radioState: 'priority'
        },

        {
          title: 'Third Note',
          newTitle: '',
          descr:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit pariatur possimus rem officia. Nesciunt aliquam odit reiciendis fugit reprehenderit animi inventore molestias recusandae corporis sit est maxime quos pariatur beatae debitis facere consectetur vitae libero odio in, aliquid quidem, ipsum iure? Autem ut nam fuga voluptatum sit molestiae sint obcaecati eius minima omnis in voluptates, quos corporis aut iusto expedita cumque odit molestias magni sapiente quas eaque deleniti inventore tempore! Pariatur a quaerat enim perferendis, aspernatur porro et nobis. Sint odit quasi, voluptatibus sit, sequi esse sapiente iusto consectetur accusamus quia ratione explicabo perferendis cupiditate totam? Optio voluptatem necessitatibus architecto.',
          newDescr: '',
          date: new Date(Date.now()).toLocaleString(),
          idNote: 2,
          edit: {
            title: false,
            descr: false
          },
          radioState: 'standart'
        },

        {
          title: 'Fourth Note',
          newTitle: '',
          descr:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum quos ducimus pariatur quo eius numquam sapiente doloremque asperiores placeat. Ea accusamus architecto cumque nisi qui officiis? Cumque temporibus nulla iste alias dolorum. Vel quod minus aperiam voluptates. Nemo reprehenderit et labore, sunt neque ullam soluta id, sapiente harum eos provident.',
          newDescr: '',
          date: new Date(Date.now()).toLocaleString(),
          idNote: 3,
          edit: {
            title: false,
            descr: false
          },
          radioState: 'important'
        },

        {
          title: 'Fifth Note',
          newTitle: '',
          descr: 'Description for fifth note',
          newDescr: '',
          date: new Date(Date.now()).toLocaleString(),
          idNote: 4,
          edit: {
            title: false,
            descr: false
          },
          radioState: 'standart'
        },

        {
          title: 'Sixth Note',
          newTitle: '',
          descr:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quis magni labore sunt deserunt incidunt odit fuga. Ad nisi doloribus quasi quidem vero ab laudantium!',
          newDescr: '',
          date: new Date(Date.now()).toLocaleString(),
          idNote: 5,
          edit: {
            title: false,
            descr: false
          },
          radioState: 'standart'
        }
      ]
    }
  },

  created() {
    this.title = this.$store.getters.getTitle
  },

  computed: {
    message() {
      return this.$store.getters.getMessage
    },

    grid() {
      return this.$store.getters.getGrid
    },

    search() {
      return this.$store.getters.getSearch
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
      let idNouteCt = this.$store.getters.getIdNouteCount

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

      this.notes.push({
        title,
        newTitle: '',
        descr,
        newDescr: '',
        date: new Date(Date.now()).toLocaleString(),
        idNote: idNouteCt,
        radioState,
        edit: {
          title: false,
          descr: false
        }
      })
      this.note.title = ''
      this.note.newTitle = ''
      this.note.descr = ''
      this.note.newDescr = ''
      this.note.radioState = ''

      idNouteCt++

      this.$store.dispatch('setMessage', message)
      this.$store.dispatch('setIdNouteCount', idNouteCt)
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
      let selectedNote = this.$store.getters.getSelectedNote

      this.notes[notesArrId].newTitle = this.notes[notesArrId].title

      if (selectedNote === '') {
        let message = ''

        this.$store.dispatch('setMessage', message)
        this.notes[notesArrId].edit.descr = false
        this.notes[notesArrId].edit.title = !this.notes[notesArrId].edit.title
        selectedNote = notesArrId
        this.$store.dispatch('setSelectedNote', selectedNote)
      } else if (selectedNote === notesArrId) {
        let message = ''

        this.$store.dispatch('setMessage', message)
        this.notes[selectedNote].newTitle = this.notes[notesArrId].title
        this.notes[selectedNote].edit.descr = false
        this.notes[selectedNote].edit.title = !this.notes[notesArrId].edit.title
      } else if (selectedNote >= 0) {
        let message = ''

        this.$store.dispatch('setMessage', message)
        this.notes[selectedNote].newTitle = ''
        this.notes[selectedNote].newDescr = ''
        this.notes[selectedNote].edit.title = false
        this.notes[selectedNote].edit.descr = false
        this.notes[notesArrId].edit.title = !this.notes[notesArrId].edit.title
        selectedNote = notesArrId
        this.$store.dispatch('setSelectedNote', selectedNote)
      }
    },

    escTitle(index) {
      let notesArrId = this.findNoteIdInArr(index)
      let message = ''

      this.$store.dispatch('setMessage', message)
      this.notes[notesArrId].newTitle = ''
      this.notes[notesArrId].edit.title = !this.notes[notesArrId].edit.title
    },

    enterTitle(index) {
      let notesArrId = this.findNoteIdInArr(index)

      if (this.notes[notesArrId].newTitle === '') {
        let message = 'Title can`t be blank!'

        this.$store.dispatch('setMessage', message)
      } else {
        let message = ''

        this.$store.dispatch('setMessage', message)
        this.notes[notesArrId].title = this.notes[notesArrId].newTitle
        this.notes[notesArrId].newTitle = ''
        this.notes[notesArrId].date = new Date(Date.now()).toLocaleString()
        this.notes[notesArrId].edit.title = !this.notes[notesArrId].edit.title
      }
    },

    editDescr(index) {
      let notesArrId = this.findNoteIdInArr(index)
      let selectedNote = this.$store.getters.getSelectedNote

      this.notes[notesArrId].newDescr = this.notes[notesArrId].descr

      if (selectedNote === '') {
        let message = ''

        this.$store.dispatch('setMessage', message)
        this.notes[notesArrId].edit.title = false
        this.notes[notesArrId].edit.descr = !this.notes[notesArrId].edit.descr
        selectedNote = notesArrId
        this.$store.dispatch('setSelectedNote', selectedNote)
      } else if (selectedNote === notesArrId) {
        let message = ''

        this.$store.dispatch('setMessage', message)
        this.notes[selectedNote].newDescr = this.notes[notesArrId].descr
        this.notes[selectedNote].edit.title = false
        this.notes[selectedNote].edit.descr = !this.notes[notesArrId].edit.descr
      } else if (selectedNote >= 0) {
        let message = ''

        this.$store.dispatch('setMessage', message)
        this.notes[selectedNote].newDescr = ''
        this.notes[selectedNote].newTitle = ''
        this.notes[selectedNote].edit.descr = false
        this.notes[selectedNote].edit.title = false
        this.notes[notesArrId].edit.descr = !this.notes[notesArrId].edit.descr
        selectedNote = notesArrId
        this.$store.dispatch('setSelectedNote', selectedNote)
      }
    },

    escDescr(index) {
      let notesArrId = this.findNoteIdInArr(index)
      let message = ''

      this.$store.dispatch('setMessage', message)
      this.notes[notesArrId].newDescr = ''
      this.notes[notesArrId].edit.descr = !this.notes[notesArrId].edit.descr
    },

    enterDescr(index) {
      let notesArrId = this.findNoteIdInArr(index)

      if (
        this.notes[notesArrId].newDescr === '' ||
        this.notes[notesArrId].newDescr === '\n'
      ) {
        let message = 'Description can`t be blank!'

        this.$store.dispatch('setMessage', message)
        this.notes[notesArrId].newDescr = ''
      } else {
        let message = ''

        this.$store.dispatch('setMessage', message)
        this.notes[notesArrId].descr = this.notes[notesArrId].newDescr
        this.notes[notesArrId].newDescr = ''
        this.notes[notesArrId].date = new Date(Date.now()).toLocaleString()
        this.notes[notesArrId].edit.descr = !this.notes[notesArrId].edit.descr
      }
    },

    clickOutside(index) {
      let clickCounter = this.$store.getters.getClickCounter
      let selectedNote = this.$store.getters.getSelectedNote

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
          this.notes[i].edit.title = false
          this.notes[i].edit.descr = false
          let descrHeight = this.$el.querySelectorAll('descr_height')
        }
        let message = ''

        this.$store.dispatch('setMessage', message)
        selectedNote = ''
        this.$store.dispatch('setSelectedNote', selectedNote)
      }
    },

    changeToStandart(index) {
      let notesArrId = this.findNoteIdInArr(index)

      this.notes[notesArrId].radioState = 'standart'
    },

    changeToPriority(index) {
      let notesArrId = this.findNoteIdInArr(index)

      this.notes[notesArrId].radioState = 'priority'
    },

    changeToImportant(index) {
      let notesArrId = this.findNoteIdInArr(index)

      this.notes[notesArrId].radioState = 'important'
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
