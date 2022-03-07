<template lang="pug">
.file-tree-cont
  Folder(:thisFolder="{id: 0, path: ''}")
</template>

<script>
import Folder from "./Folder";
export default {
  name: "FileTree",
  components: {Folder}
}
</script>

<style lang="stylus" scoped>
.file-tree-cont
  overflow-x scroll
  height 100%
.link
  cursor pointer
  :hover
    font-weight bold
</style>
