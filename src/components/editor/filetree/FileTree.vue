<template lang="pug">
.file-tree-cont
  Folder( :folder="folder[0]")
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
  width 1000px
.link
  cursor pointer
  :hover
    font-weight bold
</style>
