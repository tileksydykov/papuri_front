<template lang="pug">
.file()
  .context-menu(
    @mouseleave="out"
    :class="{close: !contextMenuOpen}"
  )
    .context-menu-content
      ul
        li
          font-awesome-icon(icon="pencil-alt")
          span.link(@click="editFile") &nbsp; Edit name
        hr
        li
          font-awesome-icon(icon="trash")
          span.link(@click="deleteFile") &nbsp; Delete
  i(
    draggable='true'
    @dragstart="startDrag($event, file, 'file')"
    v-if="!this.editing"
    :class="{selected}"
    @click="select(file.id)"
    @contextmenu.prevent="openContextMenu"
    @drop="onDrop($event)"
    @dragover.prevent
    @dragenter.prevent
  )
    font-awesome-icon.secondary(icon="file-alt").f-cyan
    span(v-if="DEBUG")
      sup.secondary &nbsp;{{ file.order_num }}
      span &nbsp;{{ file.id.slice(0, 3) }} => {{ file.prev_file_id.slice(0, 3) }}
    span(v-else) &nbsp;{{ file.name }}
  template(
    v-else
  )
    font-awesome-icon.secondary(icon="file-alt")
    span  &nbsp;
    input(
      placeholder='Name of the file'
      v-model="file.name"
      v-on:keyup="inputError = false;"
      v-on:keyup.enter="save"
      :class="{'error-input': inputError}"
    )
    .save(
      @click="save"
    ) >
</template>

<script>

import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: "File",
  data() {
    return {
      inputError: false,
      contextMenuOpen: false,
      editing: false,
      editName: false,
      DEBUG: false,
    }
  },
  props: {
    file: {
      required: true,
      type: Object,
    }
  },
  methods: {
    ...mapMutations({
      select: 'repo/selectFile',
    }),
    ...mapActions({
      saveFile: 'repo/createFile',
      update: 'repo/updateFiles',
      getFile: 'repo/getFileById',
      getFileByPrev: 'repo/getFileByPrevId'
    }),
    startDrag(evt, item, type) {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('itemID', item.id)
      evt.dataTransfer.setData('itemType', type)
    },
    async onDrop(evt) {
      const itemType = evt.dataTransfer.getData('itemType')
      const itemID = evt.dataTransfer.getData('itemID')
      if (itemID === this.file.id){
        return
      }
      if (itemType === 'file') {
        let file = await this.getFile(itemID);
        let thisFile = this.file;
        let files = [];

        if (file.folderId === thisFile.folderId) {
          if (file.order_num > thisFile.order_num)  {
            files.push({
              id: file.id,
              prev_file_id: thisFile.prev_file_id,
            })
            files.push({
              id: thisFile.id,
              prev_file_id: file.id,
            })
            let postOfFile = await this.getFileByPrev(file.id);
            if(postOfFile) {
              postOfFile.prev_file_id = file.prev_file_id;
              files.push({
                id: postOfFile.id,
                prev_file_id: postOfFile.prev_file_id,
              })
            }
          } else {
            files.push({
              id: file.id,
              prev_file_id: thisFile.id,
            })
            let postOfFile = await this.getFileByPrev(file.id);

            if(postOfFile) {
              files.push({
                id: postOfFile.id,
                prev_file_id: file.prev_file_id,
              })
            }
            let postOfThisFile = await this.getFileByPrev(thisFile.id)
            if(postOfThisFile) {
              files.push({
                id: postOfThisFile.id,
                prev_file_id: file.id,
              })
            }
          }
          if(files.length > 0){
            await this.update({
              repo: this.repo.name,
              username: this.repo.user_name,
              files
            })
          }
        }
        console.log(file, thisFile)
      }
    },
    save() {
      if (this.file.name.split('/').slice(-1).join() === '') {
        this.inputError = true;
        return
      }
      const file = this.file
      this.editing = false
      if (this.editName) {
        let paths = file.path.split('/').slice(0, -1)
        paths.push(file.name)
        file.path = paths.join('/')
        this.update({
          username: this.repo.user_name,
          repo: this.repo.name,
          files: [{
            id: file.id,
            path: file.path
          }]
        })
        this.editName = false
      } else {
        file.path += file.name
        this.saveFile({
          file,
          username: this.repo.user_name,
          repo: this.repo.name
        })
      }
    },
    out() {
      this.contextMenuOpen = false
    },
    openContextMenu() {
      this.contextMenuOpen = true
    },
    editFile() {
      this.contextMenuOpen = false
      this.editing = true
      this.editName = true
    },
    deleteFile() {
      this.update({
        username: this.repo.user_name,
        repo: this.repo.name,
        files: [{
          id: this.file.id,
          trash: true
        }]
      })
    }
  },
  computed: {
    ...mapGetters({
      repo: 'repos/getCurrent',
      selectedFile: 'repo/getSelectedFile'
    }),
    selected() {
      return this.file && this.selectedFile && this.file.id === this.selectedFile.id
    }
  },
  mounted() {
    this.editing = this.file.editing
  },
  watch: {
    file(val) {
      this.editing = val.editing
    }
  }
}
</script>

<style scoped lang="stylus">
.error-input
  border-color red

.file
  margin-left 30px
  display flex

  i
    padding 0 10px 0 2px

  input
    padding 2px !important
    border-radius 0 !important
    width 50%
    outline 0

    :focus
      border-radius 0 !important

  .save
    padding 0 3px
    border 1px solid $lines_color

.selected
  background $light_shadow_color

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
