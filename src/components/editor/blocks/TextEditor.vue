<template lang="pug">
div
  div(v-if='editor')
    span.icon
      font-awesome-icon(
        @click='editor.chain().focus().toggleBold().run()'
        :class="{ 'is-active': editor.isActive('bold') }"
        icon="bold"
      )
    span.icon
      font-awesome-icon(
        @click='editor.chain().focus().toggleItalic().run()'
        :class="{ 'is-active': editor.isActive('italic') }"
        icon="italic"
        )
    span.icon
      font-awesome-icon(
        @click='editor.chain().focus().toggleStrike().run()'
        :class="{ 'is-active': editor.isActive('strike') }"
        icon="strikethrough"
      )
    span.icon
      font-awesome-icon(
        @click='editor.chain().focus().toggleCode().run()'
        :class="{ 'is-active': editor.isActive('code') }"
        icon="code"
      )
    span.icon
      font-awesome-icon(
        @click='editor.chain().focus().unsetAllMarks().run()'
        icon="pencil-alt"
      )
    span.icon
      font-awesome-icon(
        @click='editor.chain().focus().clearNodes().run()'
        icon="broom"
      )
    span.icon
      font-awesome-icon(
        @click='editor.chain().focus().setParagraph().run()'
        :class="{ 'is-active': editor.isActive('paragraph') }"
        icon="paragraph"
      )
    span.icon.heading-cont
      font-awesome-icon(
        icon="heading"
        @click="toggleHeading"
        :class="{ 'is-active': editor.isActive('heading') }"
      )
      span.heading(
        :class="{close: !headingOpen}"
        @mouseleave="close"
        :style="headingStyle"
        )
        div.heading-item(
          @click='editor.chain().focus().toggleHeading({ level: 1 }).run()'
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
        ) H1
        div.heading-item(
          @click='editor.chain().focus().toggleHeading({ level: 2 }).run()'
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
        ) H2
        div.heading-item(
          @click='editor.chain().focus().toggleHeading({ level: 3 }).run()'
          :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
        ) H3
        div.heading-item(
          @click='editor.chain().focus().toggleHeading({ level: 4 }).run()'
          :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
        ) H4
        div.heading-item(
          @click='editor.chain().focus().toggleHeading({ level: 5 }).run()'
          :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
        ) H5
        div.heading-item(
          @click='editor.chain().focus().toggleHeading({ level: 6 }).run()'
          :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
        ) H6

    span.icon
      font-awesome-icon(
        @click='editor.chain().focus().toggleBulletList().run()'
        :class="{ 'is-active': editor.isActive('bulletList') }"
        icon="list"
      )
    span.icon
      font-awesome-icon(
        @click='editor.chain().focus().toggleOrderedList().run()'
        :class="{ 'is-active': editor.isActive('orderedList') }"
        icon="list-ol"
      )
    span.icon
      font-awesome-icon(
        @click='editor.chain().focus().toggleCodeBlock().run()'
        :class="{ 'is-active': editor.isActive('codeBlock') }"
        icon="file-code"
      )
    span.icon
      font-awesome-icon(
        @click='editor.chain().focus().toggleBlockquote().run()'
        :class="{ 'is-active': editor.isActive('blockquote') }"
        icon="quote-left"
      )
    span.icon
      font-awesome-icon(
        @click='editor.chain().focus().setHorizontalRule().run()'
        icon="ruler-horizontal"
      )
    span.icon
      font-awesome-icon(
        @click='editor.chain().focus().setHardBreak().run()'
        icon="arrow-right")
    span.icon
      font-awesome-icon(@click='editor.chain().focus().undo().run()' icon="undo")
    span.icon
      font-awesome-icon(@click='editor.chain().focus().redo().run()' icon="redo")

  EditorContent(:editor="editor").editor
</template>

<script>
import {debounce} from "@/components/editor/blocks/functions";
import { Editor, EditorContent, BubbleMenu } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

export default {
  name: "TextEditor",
  components: {
    EditorContent,BubbleMenu
  },
  props: {
    block: {
      type: Object,
      required: true,
      default: () => {
        return {
          data: {
            text: ''
          }
        }
      }
    }
  },
  data(){
    return {
      text: '',
      editor: null,
      headingOpen: false,
      headingStyle: {}
    }
  },
  mounted() {
    this.text = this.block ? this.block.data.text: ''

    this.editor = new Editor({
      content: this.text,
      editable: true,
      extensions: [
        StarterKit
      ],
      onUpdate: () => {
        debounce( () => {
          this.instantSave()
        }, 1000)()
      }
    })
  },
  beforeUnmount() {
    this.editor.destroy()
  },
  methods: {
    instantSave() {
      const block = this.block.data
      block.text = this.editor.getHTML()
      console.log(block)
      this.$emit("save", this.block)
    },
    toggleHeading(evt){
      this.headingStyle = {
        top: evt.clientY - 20 + "px",
        left: evt.clientX - 20 + "px"
      }
      this.headingOpen = !this.headingOpen
    },
    close(){
      this.headingOpen = false
    }
  }
}
</script>

<style scoped lang="stylus">
.icon
  &:hover
    color $tbn_danger_color
  svg
    padding 5px
    border-radius 4px
  .is-active
    background $lines_color
    color white
.heading-cont
  .close
    display none
  .heading
    position absolute
    padding 5px
    background $background_color
    border 1px solid $lines_color
    z-index 100
    width 40px
    text-align center
    font-size 15px
    border-radius 15px
    .heading-item
      padding 5px
      border-radius 15px
      color $text_color
      &:hover
          background $lines_color

</style>
