<template lang="pug">
.p-5
  span Video from Youtube <br>
  input(
    v-model="block.data.id"
    @change="save"
    placeholder="id from youtube video"
    )
  br
  .iframe
    iframe(
      v-if="block.data.id"
      width="100%"
      height="300px"
      :src="link(block.data.id)"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen)
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "YoutubeEditor",
  props: {
    block: {
      type: Object,
      required: true,
    }
  },
  computed: {
    ...mapGetters({
      media: "media/getVideos"
    })
  },
  methods: {
    save(){
      this.$emit("save", this.block)
    },
    link(id){
      if(id) {
        return 'https://www.youtube.com/embed/' + id
      }
      return ''
    }
  }
}
</script>

<style scoped lang="stylus">
input
  width 100%
.iframe
  margin 10px
</style>
