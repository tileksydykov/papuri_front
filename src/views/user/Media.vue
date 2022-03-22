<template lang="pug">
.page-wrapper
  .container
    Header
    h2.noto Media
    li(v-for="f in files" )
      span {{ f.id }}-{{ f.name }}
      span.right {{ size(f.size) }}
    hr
    p Total files: {{ info.media_count }} Size: {{ size(info.media_size) }} from {{ size(info.media_allowed) }}
    FileUpload
</template>

<script>
import FileUpload from "@/components/file-upload/FileUpload";
import {mapActions, mapGetters} from "vuex";
import Header from "../../components/Header";
export default {
  name: "Media",
  components: {Header, FileUpload},
  computed: {
    ...mapGetters({
      files: 'media/files',
      info: 'media/info'
    })
  },
  methods: {
    ...mapActions({
      fetchFiles: 'media/getFiles',
      fetchInfo: 'media/fetchMediaInfo',
    }),
    size(bytes){
      return this.bytesToSize(bytes)
    }
  },
  mounted() {
    this.fetchFiles()
    this.fetchInfo()
  }
}
</script>

<style scoped lang="stylus">

</style>
