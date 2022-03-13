<template lang="pug">
.d-flex
  FileTree.p-10.file-tree
  FileEditor.file-editor
</template>

<script>
import FileTree from "./filetree/FileTree";
import FileEditor from "./FileEditor";
export default {
  name: "Editor",
  components: {FileEditor, FileTree}
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
