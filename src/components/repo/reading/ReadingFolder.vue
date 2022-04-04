<template lang="pug">
.reading-folder
  span.bold {{ folder.name }}
  template(v-for="f in folder.folders")
    ReadingFolder(:folder="f")
  template(v-for="file in folder.files")
    .secondary.clickable(
      v-if="file.name !== '.folder'"
      @click="fileClick(file)"
      ) {{ file.name }}
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "ReadingFolder",
  props: {
    folder: {
      type: Object,
      required: true,
    }
  },
  methods: {
    ...mapMutations({
      fileClick: "repos/setReadingFile"
    })
  }
}
</script>

<style scoped lang="stylus">
.reading-folder
  margin-left 10px
</style>
