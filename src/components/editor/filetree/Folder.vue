<template lang="pug">
.folder(
  style="margin-left: 10px"
  v-if="folder"
  )
  span.folder-title(
    draggable='true'
    @dragstart="startDrag($event, folder, 'folder')"
    @drop="onDrop($event)"
    @dragover.prevent
    @dragenter.prevent
    @click="toggle"
    )
    font-awesome-icon.secondary(icon="folder")
    span  &nbsp;{{ folder.name }}
  span.link(@click="addFileToThisFolder") +
  .folder-content(:class="{'close-folder': !open, 'open-folder': open}")
    Folder(
      v-for="f in folder.folders"
      :key="f.id"
      :folder="f")
    File(
      v-for="file in folder.files"
      :key="file.id"
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
          toFolder: this.thisFolder
        })
      }
    },
    addFileToThisFolder () {
      const lastFile = this.files(this.thisFolder.id).slice(-1)[0]
      this.addFiles({
        id: uuidv4(),
        name: '',
        path: this.thisFolder.path,
        editing: true,
        folderId: this.thisFolder.id,
        content: '',
        prev_file_id: lastFile ? lastFile.id : "0"
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
</style>
