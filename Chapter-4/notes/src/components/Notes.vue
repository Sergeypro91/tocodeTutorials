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
      v-for="(note, index) in notes"
      :key="note.idNote"
      v-click-outside="outside"
    >
      <!--  -->
      <div class="note-header" :class="{ full: !grid }">
        <p @click="editTitle(note.idNote)">{{ note.title }}</p>
        <p @click="removeNote(note.idNote)">x</p>
      </div>
      <div class="edit-title" :class="{ edittitle: note.edit.title }">
        <input
          type="text"
          class="edit-title__text"
          :placeholder="'Edit title:'"
          @keydown.esc="escEdit(note.idNote)"
          @keydown.enter="enterEdit(note.idNote)"
          v-model="note.newTitle"
        />
      </div>
      <div class="note-body">
        <p
          @click="editDescr(note.idNote)"
          :class="{ hideOldDescr: note.edit.descr }"
        >
          {{ note.descr }}
        </p>

        <textarea
          rows="4"
          v-model="note.newDescr"
          :placeholder="'Edit description:'"
          class="edit-descr"
          :class="{ editdescr: note.edit.descr }"
          @keydown.esc="escEditDescr(note.idNote)"
          @keydown.enter="enterEditDescr(note.idNote)"
        ></textarea>
        <span>{{ note.date }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
      console.log(`Note id - ${index} removed`)
      this.$emit('remove', index)
    },
    editTitle(index) {
      console.log(`Ready to edit title - ${index}`)
      this.$emit('edit', index)
    },
    escEdit(index) {
      console.log(`Exit from title edit - ${index}`)
      this.$emit('esc', index)
    },
    enterEdit(index) {
      console.log(`Enter date to Edit - ${index}`)
      this.$emit('enter', index)
    },
    editDescr(index) {
      console.log(`Ready to edit description - ${index}`)
      this.$emit('editDescr', index)
    },
    escEditDescr(index) {
      console.log(`Exit from description edit - ${index}`)
      this.$emit('escDescr', index)
    },
    enterEditDescr(index) {
      console.log(`Enter date to Description - ${index}`)
      this.$emit('enterDescr', index)
    },
    outside(index) {
      console.log('Click outside')
      this.$emit('clickOutside', index)
    }
  },
  directives: {
    'click-outside': {
      bind: function(el, binding, vnode) {
        el.clickOutsideEvent = function(event) {
          // here I check that click was outside the el and his childrens
          if (!(el == event.target || el.contains(event.target))) {
            // and if it did, call method provided in attribute value
            binding.value(event)
          }
        }
        document.body.addEventListener('click', el.clickOutsideEvent)
      },
      unbind: function(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent)
      }
    }
  }
}
</script>

<style lang="scss">
.notes {
  display: inline-block;
  column-count: 2;
  padding: 40px 0;
  &.wide {
    display: flex;
    align-self: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}
.note {
  width: 100%;
  min-height: 156px;
  break-inside: avoid;
  page-break-inside: avoid;
  padding: 18px 20px;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 30px 30px rgba(0, 0, 0, 0.02);
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
  &:hover {
    box-shadow: 0 30px 30px rgba(0, 0, 0, 0.04);
    transform: translate(0, -6px);
    transition-delay: 0s !important;
  }
  &.full {
    width: 100%;
    text-align: center;
  }
  &.priority {
    background: #fdd835;
    input {
      border: #777777 solid 1px;
    }
    span {
      color: #777777;
    }
  }
  &.important {
    background: #d40000;
    input,
    input::placeholder,
    p {
      color: #eeeeee;
    }
    textarea {
      color: #fff;
    }
    span {
      color: #bbbbbb;
    }
  }
}
.note-header,
.note-header--edit {
  display: flex;
  align-items: center;
  justify-content: space-between;
  &.full {
    justify-content: center;
    p {
      margin-right: 16px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  h1 {
    font-size: 22px;
  }
  p {
    font-size: 22px;
    color: #402caf;
    cursor: pointer;
    align-self: flex-start;
    &:nth-child(2) {
      margin-left: 20px;
    }
  }
  svg {
    margin-right: 12px;
    color: #999;
    &.active {
      color: #402caf;
    }
    &:last-child {
      margin-right: 0;
    }
  }
}
.note-body {
  margin: 20px 0;
}
span {
  font-size: 14px;
  color: #999;
}
.edit-title,
.edit-descr,
.hideOldDescr {
  display: none;
}
.edittitle,
.editdescr {
  display: flex;
  margin-top: 20px;
}
.edit-title__text {
  margin: 0;
  background: none;
}
.edit-descr {
  background: none;
}
</style>
