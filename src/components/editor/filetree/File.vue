<template lang="pug">
.file
  i(
    draggable='true'
    @dragstart="startDrag($event, file, 'file')"
    style='color: red'
    v-if="!this.file.editing"
    @click="select(file.id)") >{{ file.name }}
  template(v-else)
    input(
      placeholder='name'
      v-model="file.name"
      v-on:keyup.enter="save"
    )
    .save(
      @click="save"
    ) >
</template>

<script>

import {mapMutations} from "vuex";

export default {
  name: "File",
  props: {
    file: {
      required: true,
      type: Object,
    }
  },
  methods: {
    ...mapMutations({
      select: 'repo/selectFile',
      saveFile: 'repo/saveFile'
    }),
    startDrag (evt, item, type) {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('itemID', item.id)
      evt.dataTransfer.setData('itemType', type)
    },
    save(){
      const file = this.file
      file.editing = false
      file.path += '/' + file.name
      this.saveFile(file)
    }
  }
}
</script>

<style scoped lang="stylus">
.file
  margin-left 10px
  display flex
  input
    padding 2px !important
    border-radius 0 !important
    width 70%
    :focus
      border-radius 0 !important
  .save
    padding 0 3px
    border 1px solid $lines_color
</style>
