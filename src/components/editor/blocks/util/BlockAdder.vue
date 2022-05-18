<template lang="pug">
.d-flex.flex-center
  div.column
    .add-button(@click="add('text')")
      font-awesome-icon(icon="envelope-open-text")
      span &nbsp;
      span  Text
    .add-button(@click="add('image')")
      font-awesome-icon(icon="image")
      span &nbsp;
      span  Image
    .add-button(@click="add('video')")
      font-awesome-icon(icon="video")
      span &nbsp;
      span  Video
    .add-button(@click="add('audio')")
      font-awesome-icon(icon="file-audio")
      span &nbsp;
      span  Audio
    .add-button(@click="add('test')")
      font-awesome-icon(icon="file-alt")
      span &nbsp;
      span  Test
  div
    .add-button(@click="add('katex')")
      font-awesome-icon(icon="envelope-open-text")
      span &nbsp;
      span  Katex Text
</template>

<script>
export default {
  name: "BlockAdder",
  methods: {
    add(block){
      this.$emit("add", block)
    }
  }
}
</script>

<style scoped lang="stylus">
.add-button
  margin 10px
  background $background_color
  text-align center
  cursor pointer
.column
  .add-button
    text-align left
    &:hover
      color $text_color

</style>
