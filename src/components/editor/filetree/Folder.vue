<template lang="pug">
.folder(
  v-if="thisFolder.id === 0"
  )
  b(
    @drop="onDrop($event)"
    @dragover.prevent
    @dragenter.prevent
    ) {{ repo.name }}
  span.link(@click="addFileToThisFolder") :+:
  .folder-content(:class="{'close-folder': !open, 'open-folder': open}")
    Folder(
      v-for="folder in folders(thisFolder.id)"
      :key="folder.id"
      :thisFolder="folder")
    File(
      v-for="file in files(thisFolder.id)"
      :key="file.id"
      :file="file"
    )

.folder(
  v-else
  style="margin-left: 10px"
  )
  span(
    draggable='true'
    @dragstart="startDrag($event, thisFolder, 'folder')"
    @drop="onDrop($event)"
    @dragover.prevent
    @dragenter.prevent
    @click="toggle"
    ) {{ thisFolder.name }}
  span.link(@click="addFileToThisFolder") +
  .folder-content(:class="{'close-folder': !open, 'open-folder': open}")
    Folder(
      v-for="folder in folders(thisFolder.id)"
      :key="folder.id"
      :thisFolder="folder")
    File(
      v-for="file in files(thisFolder.id)"
      :key="file.id"
      :file="file"
      )
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import File from "./File";

export default {
  name: "Folder",
  components: {File},
  data() {
    return {
      open: true,
    }
  },
  props: {
    thisFolder: {
      required: true,
      type: Object,
    }
  },
  computed: {
    ...mapGetters({
      folders: 'repo/getFoldersByFolderId',
      files: 'repo/getFilesByFolderId',
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
      const itemID = parseInt(evt.dataTransfer.getData('itemID'))
      if (itemType === 'file') {
        this.moveFile({
          fileId: itemID,
          toFolder: this.thisFolder,
        })
      }
      else if (itemType === 'folder') {
        this.moveFolder({
          folderId: itemID,
          toFolder: this.thisFolder
        })
      }
    },
    addFileToThisFolder(){
      this.addFiles({
        id: Math.random(),
        name: '',
        path: this.thisFolder.path,
        editing: true,
        folderId: this.thisFolder.id
      })
    },
    toggle(){
      this.open = !this.open
    }
  },
}
</script>

<style scoped lang="stylus">
.folder
  transition .3s
  cursor pointer
  overflow hidden
.close-folder
  height 0
.open-folder
  height auto
.folder-content
  transition 0.2s
</style>
