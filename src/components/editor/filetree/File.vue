<template lang="pug">
.file
  i(
    draggable='true'
    @dragstart="startDrag($event, file, 'file')"
    v-if="!this.file.editing"
    :class="{selected}"
    @click="select(file.id)")
    font-awesome-icon.secondary(icon="file-alt")
    span  &nbsp;{{ file.name }} -> {{ file.order_num }}
  template(v-else)
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
  data(){
    return {
      inputError: false
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
      saveFile: 'repo/createFile'
    }),
    startDrag (evt, item, type) {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('itemID', item.id)
      evt.dataTransfer.setData('itemType', type)
    },
    save(){
      if (this.file.name.split('/').slice(-1).join() === ''){
        this.inputError = true;
        return
      }
      const file = this.file
      file.editing = false
      file.path += file.name
      this.saveFile({
        file,
        username: this.repo.user_name,
        repo: this.repo.name
      })
    }
  },
  computed: {
    ...mapGetters({
      repo: 'repos/getCurrent',
      selectedFile: 'repo/getSelectedFile'
    }),
    selected(){
      return this.file && this.selectedFile && this.file.id === this.selectedFile.id
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
</style>
