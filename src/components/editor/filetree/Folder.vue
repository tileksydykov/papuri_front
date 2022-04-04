<template lang="pug">
.folder(
  style="margin-left: 10px"
  v-if="folder"
  )
  .context-menu(
    @mouseleave="out"
    :class="{close: !contextMenuOpen}"
  )
    .context-menu-content
      ul
        li
          span.link(@click="addFileToThisFolder") Add new file +
        li
          span.link(@click="addFolderToThisFolder") Add new folder +
  span.folder-title(
    draggable='true'
    @dragstart="startDrag($event, folder, 'folder')"
    @drop="onDrop($event)"
    @dragover.prevent
    @dragenter.prevent
    @click="toggle"
    @contextmenu.prevent="openContextMenu"
    )
    font-awesome-icon.secondary(icon="folder")
    span  &nbsp;{{ folder.name }}

  .folder-content(:class="{'close-folder': !open, 'open-folder': open}")
    Folder(
      v-for="f in folder.folders"
      :key="f.id"
      :folder="f")
    template(
      v-for="file in folder.files"
      :key="file.id"
    )
      File(
        v-if="file.name !== '.folder'"
        :file="file"
        )
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import File from "./File";
import {uuidv4} from "@/store/repo/functions";

export default {
  name: "Folder",
  components: {File},
  data() {
    return {
      open: true,
      contextMenuOpen: false
    }
  },
  props: {
    folder: {
      required: true,
      type: Object,
    }
  },
  computed: {
    ...mapGetters({
      repo: 'repos/getCurrent'
    }),
  },
  methods: {
    ...mapActions({
      moveFile: 'repo/moveFile',
      moveFolder: 'repo/moveFolder',
    }),
    ...mapMutations({
      select: 'repo/selectFile',
      addFiles: 'repo/addFiles'
    }),
    startDrag (evt, item, type) {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('itemID', item.id)
      evt.dataTransfer.setData('itemType', type)
    },
    onDrop (evt) {
      const itemType = evt.dataTransfer.getData('itemType')
      const itemID = evt.dataTransfer.getData('itemID')
      if (itemType === 'file') {
        this.moveFile({
          fileId: itemID,
          toFolder: this.folder,
          username: this.repo.user_name,
          repo: this.repo.name,
        })
      }
      else if (itemType === 'folder') {
        this.moveFolder({
          folderId: parseInt(itemID),
          toFolder: this.folder
        })
      }
    },
    closeMenu(){
      this.contextMenuOpen = false
    },
    addFileToThisFolder () {
      this.closeMenu()
      const lastFile = this.folder.files.slice(-1)[0]
      this.addFiles({
        id: uuidv4(),
        name: '',
        path: this.folder.path,
        editing: true,
        folderId: this.folder.id,
        content: '',
        prev_file_id: lastFile ? lastFile.id : "0"
      })
    },
    addFolderToThisFolder () {
      this.closeMenu()
      this.addFiles({
        id: uuidv4(),
        name: 'folder/.folder',
        path: this.folder.path,
        folderId: this.folder.id,
        content: '',
      })
    },
    toggle(){
      this.open = !this.open
    },
    openContextMenu() {
      this.contextMenuOpen = true
    },
    out(){
      this.contextMenuOpen = false
    }
  },
}
</script>

<style scoped lang="stylus">
.folder
  position relative
  width 100%
  cursor pointer
.close-folder
  height 0
  &.folder-content
    display none
.open-folder
  height auto
.folder-title
  &:hover
    font-weight bolder
.context-menu
  position absolute
  background $background_color
  z-index 99999
  border-radius 3px
  box-shadow 2px 2px 10px $light_lines_color
  border 1px solid $lines_color
  .context-menu-content
    padding 5px
    ul
      list-style none
      padding 0
      margin 0
      li
        padding 3px
        border-radius 3px
        &:hover
          background $light_shadow_color
  &.close
    display none
  &.open
    display block

</style>
