<template lang="pug">
span(:class="{active: readingFile.id === file.id}") {{ file.name }}
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "ReadingFile",
  props: {
    file: {
      required: true,
      type: Object
    }
  },
  computed:{
    ...mapGetters({
      readingFile: "repos/getReadingFile",
      reading: "repos/getReading",
    })
  },
  methods: {
    ...mapMutations({
      setReadingFile: "repos/setReadingFile"
    }),
  },
  mounted() {
    if (this.file.id === this.reading.last_file_id){
      this.setReadingFile(this.file)
    }
  }
}
</script>

<style scoped lang="stylus">
.active
  font-weight bold
</style>
