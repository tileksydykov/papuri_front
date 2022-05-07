<template lang="pug">
.page-wrapper
  .container
    Header
    h2.noto(
      v-if="readingRepo && readingRepo.repo"
      @click="$router.push({name: 'RepoOverview', params: {username: reading.repo.user_name, repo: reading.repo.name}})"
      ).clickable {{ readingRepo.repo.title }}
    .d-flex
      .w-25
        .files-folder
          ReadingFolder(:folder="folder")
      .w-75
        h1 {{ file.name }}
        Reader(:content="file.content")
</template>

<script>
import Header from "@/components/Header";
import {mapActions, mapGetters} from "vuex";
import ReadingFolder from "../components/repo/reading/ReadingFolder";
import Reader from "../components/reader/Reader";

export default {
  name: "CurrentBook",
  components: {Reader, ReadingFolder, Header},
  methods: {
    ...mapActions({
      fetchFiles: "repos/getReadingFiles",
      fetchReading: "repos/getReading"
    })
  },
  computed: {
    ...mapGetters({
      readingRepo: "repos/getReading",
      readingFiles: "repos/listReadingFiles",
      folder: "repos/listReadingFolder",
      file: "repos/getReadingFile",
      html: "repos/getReadingFileHTML"
    })
  },
  mounted() {
    if (!this.$route.params.internal) {
      this.fetchReading()
    }

    if(this.readingRepo && this.readingRepo.repo){
      this.fetchFiles({
        username: this.readingRepo.repo.user_name,
        repo: this.readingRepo.repo.name
      })
    }
  },
  watch: {
    readingRepo(reading) {
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

<style lang="stylus">
.image
  max-width 100%
</style>
