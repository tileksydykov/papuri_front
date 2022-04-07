<template lang="pug">
.file-tree-cont.scrollbar
  .folder-cont
    Folder.margin-0(v-if="folder[0]" :folder="folder[0]")
</template>

<script>
import Folder from "./Folder";
import {mapGetters} from "vuex";
export default {
  name: "FileTree",
  components: {Folder},
  computed: {
    ...mapGetters({
      folder: "repo/getRoot"
    })
  }
}
</script>

<style lang="stylus" scoped>
.file-tree-cont
  font-size 14px
  min-height 200px
  .folder-cont
    display block
    width max-content
.link
  cursor pointer
  :hover
    font-weight bold
.margin-0
  margin 0
</style>
