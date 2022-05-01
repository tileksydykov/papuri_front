<template lang="pug">
.file-tree-cont.scrollbar
  Branches(:branches="branches")
  hr
  Loader(v-if="folder.length === 0")
  .folder-cont
    Folder.margin-0(v-if="folder[0]" :folder="folder[0]")
  hr
  Commit
  hr
  CommitList
</template>

<script>
import Folder from "./Folder";
import {mapGetters} from "vuex";
import Loader from "../../util/Loader";
import Commit from "./Commit";
import Branches from "./Branches";
import CommitList from "./CommitList";

export default {
  name: "FileTree",
  components: {CommitList, Branches, Commit, Loader, Folder},
  computed: {
    ...mapGetters({
      folder: "repo/getRoot",
      branches: "repo/getBranches"
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
