<template lang="pug">
.reading-folder
  span.bold {{ folder.name }}
  template(v-for="f in folder.folders")
    ReadingFolder(:folder="f")
  template(v-for="file in folder.files")
    .secondary.clickable.files(
      v-if="file.name !== '.folder'"
      @click="fileClick(file)"
      )
        ReadingFile(:file="file")
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import ReadingFile from "./File";

export default {
  name: "ReadingFolder",
  components: {ReadingFile, File},
  props: {
    folder: {
      type: Object,
      required: true,
    }
  },
  methods: {
    ...mapActions({
      updateReadingFile: "repos/updateReading"
    }),
    fileClick(file){
      this.updateReadingFile({
        file,
        repository: this.reading.repo
      })
    },
    style(fileId){
      if (fileId === this.readingFile.id) {
        return {"font-weight": "bold"}
      }
      return { }
    }
  },
  computed: {
    ...mapGetters({
      reading: "repos/getReading",
    })
  }
}
</script>

<style scoped lang="stylus">
.reading-folder
  margin-left 10px
  .files
    margin-left 10px

</style>
