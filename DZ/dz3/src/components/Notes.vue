<template>
  <!-- note list -->
  <div class="notes" :class="{ wide: !grid }">
    <div
      class="note"
      :class="{
        full: !grid,
        priority: note.radioState == 'priority',
        important: note.radioState == 'important'
      }"
      v-for="note in notes"
      :key="note.idNote"
      v-click-outside="outside"
    >
      <div class="note-header" :class="{ full: !grid }">
        <div class="note-header__title">
          <p @click="editTitle(note.idNote)">{{ note.title }}</p>
        </div>

        <div class="note-header__priority-change">
          <div
            class="note-header__priority-change_standart"
            @click="changeToStandart(note.idNote)"
            :class="{ hidestandart: note.radioState == 'standart' }"
          ></div>
          <div
            class="note-header__priority-change_priority"
            @click="changeToPriority(note.idNote)"
            :class="{ hidepriority: note.radioState == 'priority' }"
          ></div>
          <div
            class="note-header__priority-change_important"
            @click="changeToImportant(note.idNote)"
            :class="{ hideimportant: note.radioState == 'important' }"
          ></div>

          <p @click="removeNote(note.idNote)">x</p>
        </div>
      </div>

      <div class="edit-title" :class="{ edittitle: note.edit.title }">
        <input
          type="text"
          class="edit-title__text"
          :placeholder="'Edit title:'"
          @keydown.esc="escTitle(note.idNote)"
          @keydown.enter="enterTitle(note.idNote)"
          v-model="note.newTitle"
        />
      </div>

      <div class="note-body">
        <p
          class="descr_height"
          @click="editDescr(note.idNote)"
          :class="{ hideOldDescr: note.edit.descr }"
        >
          {{ note.descr }}
        </p>

        <textarea
          v-model="note.newDescr"
          :placeholder="'Edit description:'"
          class="edit-descr js-autoresize"
          :class="{ editdescr: note.edit.descr }"
          @keydown.esc="escDescr(note.idNote)"
          @keydown.enter="enterDescr(note.idNote)"
        ></textarea>

        <span>{{ note.date }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { setResizeListeners } from '../directives/auto-resize.js'

export default {
  name: 'Notes',
  props: {
    notes: {
      type: Array,
      require: true
    },
    grid: {
      type: Boolean,
      require: true
    }
  },

  methods: {
    removeNote(index) {
      this.$emit('remove', index)
    },

    editTitle(index) {
      this.$emit('editTitle', index)
    },

    escTitle(index) {
      this.$emit('escTitle', index)
    },

    enterTitle(index) {
      this.$emit('enterTitle', index)
    },

    editDescr(index) {
      this.$emit('editDescr', index)
    },

    escDescr(index) {
      this.$emit('escDescr', index)
    },

    enterDescr(index) {
      this.$emit('enterDescr', index)
    },

    outside(index) {
      this.$emit('clickOutside', index)
    },

    changeToStandart(index) {
      this.$emit('changeToStandart', index)
    },

    changeToPriority(index) {
      this.$emit('changeToPriority', index)
    },

    changeToImportant(index) {
      this.$emit('changeToImportant', index)
    }
  },

  directives: {
    'click-outside': {
      bind: function(el, binding, vnode) {
        el.clickOutsideEvent = function(event) {
          if (!(el == event.target || el.contains(event.target))) {
            binding.value(event)
          }
        }

        document.body.addEventListener('click', el.clickOutsideEvent)
      },

      unbind: function(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent)
      }
    }
  },

  mounted() {
    setResizeListeners(this.$el, '.js-autoresize')
  },

  updated: function() {
    this.$nextTick(function() {
      setResizeListeners(this.$el, '.js-autoresize')
    })
  }
}
</script>

<style lang="scss"></style>
