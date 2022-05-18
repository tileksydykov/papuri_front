<template lang="pug">
h3.clickable(@click="$router.go(-1)")
  font-awesome-icon(icon="arrow-left")
  span &nbsp;{{ repo.title }}
.d-flex
  FileTree.p-10.file-tree
  FileEditor.file-editor
</template>

<script>
import FileTree from "./filetree/FileTree";
import FileEditor from "./FileEditor";
import {mapGetters} from "vuex";
export default {
  name: "Editor",
  components: {FileEditor, FileTree},
  computed: {
    ...mapGetters({
      repo: "repos/getCurrent"
    })
  }
}
</script>

<style lang="stylus" scoped>
.file-tree
  width 30%
  overflow-x scroll
  height 100%
.file-editor
  width 100%
</style>
