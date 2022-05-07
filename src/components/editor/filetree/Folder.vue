<template lang="pug">
.folder(
  v-if="folder"
  )
  .context-menu(
    @mouseleave="out"
    :class="{close: !contextMenuOpen}"
  )
    .context-menu-content
      ul
        li
          font-awesome-icon(icon="file")
          span.link(@click="addFileToThisFolder") &nbsp; Add new file
        li
          font-awesome-icon(icon="folder")
          span.link(@click="addFolderToThisFolder") &nbsp; Add new folder
        li
          font-awesome-icon(icon="filter")
          span.link(@click="orderFilesInFolder") &nbsp; Order files
        template(v-if="folder.id !== 0")
          hr
          li
            font-awesome-icon(icon="pencil-alt")
            span.link(@click="addFolderToThisFolder") &nbsp; Rename folder
          hr
          li
            font-awesome-icon(icon="trash")
            span.link(@click="deleteFolder") &nbsp; Delete
  span.folder-title(
    draggable='true'
    @dragstart="startDrag($event, folder, 'folder')"
    @drop="onDrop($event)"
    @dragover.prevent
    @dragenter.prevent
    @click="toggle"
    @contextmenu.prevent="openContextMenu"
    v-if="!folder.editing"
    )
    span.chevron
      font-awesome-icon(
        :icon="chevron"
        )
    span &nbsp;
    font-awesome-icon.secondary(icon="folder").f-yellow
    span  &nbsp;{{ folder.name }}
  span(v-else).d-flex
    span.chevron
      font-awesome-icon(
        :icon="chevron"
      )
    span  &nbsp;
    font-awesome-icon.secondary(icon="folder")
    span  &nbsp;
    input(
      placeholder='Name of the folder'
      v-model="folder.name"
      v-on:keyup="inputError = false;"
      v-on:keyup.enter="save"
      :class="{'error-input': inputError}"
    )
    .save(
      @click="save"
    ) >
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
      contextMenuOpen: false,
      inputError: false,
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
    chevron(){
      const length = this.folder.files.filter(f => f.name !== ".folder").length
      if (this.folder.folders.length + length < 1) {
        return 'minus'
      }
      return this.open ? 'chevron-down': 'chevron-right'
    }
  },
  methods: {
    ...mapActions({
      moveFile: 'repo/moveFile',
      moveFolder: 'repo/moveFolder',
      saveFile: 'repo/createFile',
      updateFiles: 'repo/updateFiles'
    }),
    ...mapMutations({
      select: 'repo/selectFile',
      addFiles: 'repo/addFiles',
      saveFolder: 'repo/saveFolder'
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
      this.open = true
    },
    addFileToThisFolder () {
      this.closeMenu()
      const lastFile = this.folder.files.slice(-1)[0]
      if (lastFile && lastFile.name === ''){
        return
      }
      this.addFiles({
        id: uuidv4(),
        name: '',
        path: this.folder.path + '/',
        editing: true,
        content: '',
        prev_file_id: lastFile ? lastFile.id : "0"
      })
    },
    addFolderToThisFolder () {
      this.closeMenu()
      const name = './.folder'
      let folderFile = {
        id: uuidv4(),
        name,
        path: this.folder.path + '/' + name,
        content: '',
      }
      this.addFiles(folderFile)
    },
    toggle() {
      this.open = !this.open
    },
    openContextMenu() {
      this.contextMenuOpen = true
    },
    out(){
      this.contextMenuOpen = false
    },
    save(){
      if (this.folder.name.split('/').slice(-1).join() === ''){
        this.inputError = true;
        return
      }
      this.saveFolder({
        ...this.folder,
        editing: false
      })
      const path = this.folder.path.slice(0, -1)
      const file = {
        id: uuidv4(),
        path: path + this.folder.name + '/.folder'
      }
      this.saveFile({
        file,
        username: this.repo.user_name,
        repo: this.repo.name
      })
    },
    orderFilesInFolder() {
      this.closeMenu();
      const files = this.folder.files.filter(f => f.name !== '.folder');
      if (files.length < 1) {
        return
      }
      files[0].prev_file_id = '0'
      for (let i = 1; i < files.length; i++) {
        files[i].prev_file_id = files[i-1].id;
      }
      this.updateFiles({
        username: this.repo.user_name,
        repo: this.repo.name,
        files: files.map(f => {
          return {
            id: f.id,
            prev_file_id: f.prev_file_id
          }
        })
      })
    },
    deleteFolder(){
      this.closeMenu()
      this.updateFiles({
        username: this.repo.user_name,
        repo: this.repo.name,
        files: this.folder.files.map(f => {
          return {
            id: f.id,
            trash: true
          }
        })
      })
    }
  },
}
</script>

<style scoped lang="stylus">
.folder
  position relative
  width 100%
  cursor pointer
  margin-left: 15px
  input
    padding 2px !important
    border-radius 0 !important
    width 70%
    outline 0
    :focus
      border-radius 0 !important
  .save
    padding 0 3px
    border 1px solid $lines_color
.close-folder
  height 0
  &.folder-content
    display none
.open-folder
  height auto
.folder-title
  &:hover
    font-weight bolder
  .chevron
    width 12px
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
        width max-content
        padding 3px
        border-radius 3px
        &:hover
          background $light_shadow_color
  &.close
    display none
  &.open
    display block
.error-input
  border-color red

</style>
