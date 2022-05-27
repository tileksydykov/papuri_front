<template lang="pug">
.p-5
  iframe(
    v-if="block.data.id"
    width="100%"
    height="400px"
    :src="link(block.data.id)"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen)
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "YoutubeReader",
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

.video
  width 100%
</style>
