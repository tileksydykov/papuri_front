<template lang="pug">
div(v-html="html")
</template>

<script>
import katex from "katex";

export default {
  name: "KatexReader",
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
    }
  },
  computed: {
    html(){
      console.log(this.block.data.text)
      return this.block.data.text.split("$").map(txt => {
        if (txt.indexOf('<') > -1) {
          return txt
        }else {
          return katex.renderToString(txt, {throwOnError: false})
        }
      }).join('')
    }
  }
}
</script>

<style scoped lang="stylus">
textarea
  width 100% !important
  border-radius 0
  border none
  outline none
  min-height 100px
</style>
