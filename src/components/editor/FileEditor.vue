<template lang="pug">
p(v-if="!file") file not choosen
.editors-container(v-else)
  div.editor_header.right.d-flex
    div() split |
    div() | preview
  p {{ file.name }}
  .d-flex
    .blocks
      div.add-button +
    .preview( v-html="'<br> hello'" )
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "FileEditor",
  data(){
    return {
      containers: [
        {
          id: '1',
          containerName: "Text",

        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      file: "repo/getSelectedFile"
    })
  },
  methods: {
    render(){

    }
  }
}
</script>

<style scoped lang="stylus">
.blocks
  width 50%
.preview
  width 50%
</style>
