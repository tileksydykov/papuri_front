<template lang="pug">
.file
  i(draggable='true' @dragstart="startDrag($event, file, 'file')" style='color: red') {{ file.name }}
</template>

<script>

export default {
  name: "File",
  props: {
    file: {
      required: true,
      type: Object,
    }
  },
  methods: {
    startDrag (evt, item, type) {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('itemID', item.id)
      evt.dataTransfer.setData('itemType', type)
    },
  }
}
</script>

<style scoped lang="stylus">
.file
  margin-left 10px
</style>
