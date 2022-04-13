<template lang="pug">
.file-tree-cont.scrollbar
  Loader(v-if="folder.length === 0")
  .folder-cont
    Folder.margin-0(v-if="folder[0]" :folder="folder[0]")
</template>

<script>
import Folder from "./Folder";
import {mapGetters} from "vuex";
import Loader from "../../util/Loader";

export default {
  name: "FileTree",
  components: {Loader, Folder},
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
  border-right 1px solid $red
  border-left 1px solid $red
  border-radius 10px
  .folder-cont
    display block
    width max-content
    min-width 95%
.link
  cursor pointer
  :hover
    font-weight bold
.margin-0
  margin 0
</style>
