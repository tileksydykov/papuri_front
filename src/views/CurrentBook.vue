<template lang="pug">
.page-wrapper
  .container
    Header
    h2.noto(v-if="readingRepo && readingRepo.repo") {{ readingRepo.repo.title }}
    .d-flex
      .w-25
        .files(v-for="file in readingFiles" :key="file.id") {{ file.path }}
      .w-75
        .file {{  }}

</template>

<script>
import Header from "@/components/Header";
import {mapActions, mapGetters} from "vuex";
export default {
  name: "CurrentBook",
  components: {Header},
  methods: {
    ...mapActions({
      fetchFiles: "repos/getReadingFiles",
      fetchReading: "repos/getReading"
    })
  },
  computed: {
    ...mapGetters({
      readingRepo: "repos/getReading",
      readingFiles: "repos/listReadingFiles"
    })
  },
  mounted() {
    if (!this.$route.params.internal) {
      this.fetchReading()
    }
  },
  watch: {
    readingRepo(reading){
      if(reading && reading.repo){
        this.fetchFiles({
          username: reading.repo.user_name,
          repo: reading.repo.name
        })
      }
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
