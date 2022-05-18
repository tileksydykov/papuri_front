<template lang="pug">
div
  button.btn.btn-cyan(@click="instantSave") save
  VueTiptapKatex(ref="tiptap" :options="editorOptions")
</template>

<script>

import VueTiptapKatex from 'vue3-tiptap-katex'

export default {
  name: "TextEditor",
  components: {
    VueTiptapKatex,
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
      headingStyle: {},
      editorOptions: {}
    }
  },
  mounted() {
    this.text = this.block ? this.block.data.text: ''
    this.editor = this.$refs.tiptap
    this.editor.setContent(this.text)
  },
  methods: {
    instantSave() {
      const block = this.block.data
      block.text = this.editor.getContent()
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
