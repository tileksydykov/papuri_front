<template lang="pug">
.folder(
  v-if="thisFolder.id === 0"
  )
  b(
    @drop="onDrop($event)"
    @dragover.prevent
    @dragenter.prevent
    ) {{ thisFolder.name }}
  Folder(
    v-for="folder in folders(thisFolder.id)"
    :key="folder.id"
    :thisFolder="folder")
  File(
    v-for="file in files(thisFolder.id)"
    :key="file.id"
    :file="file"
    @click="select(file.id)"
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
    ) {{ thisFolder.name }}
  Folder(
    v-for="folder in folders(thisFolder.id)"
    :key="folder.id"
    :thisFolder="folder")
  File(
    v-for="file in files(thisFolder.id)"
    :key="file.id"
    :file="file"
    @click="select(file.id)")
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import File from "./File";

export default {
  name: "Folder",
  components: {File},
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
    }),
  },
  methods: {
    ...mapActions({
      moveFile: 'repo/moveFile',
      moveFolder: 'repo/moveFolder',
    }),
    ...mapMutations({
      select: 'repo/selectFile'
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
          toFolder: this.thisFolder.id,
        })
      }
      else if (itemType === 'folder') {
        this.moveFolder({
          folderId: itemID,
          toFolder: this.thisFolder.id
        })
      }
    }
  },
}
</script>

<style scoped lang="stylus">
.folder
  transition .3s
</style>
