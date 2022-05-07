<template lang="pug">
.p-5
  video.video(v-if="block.data.id && block.data.id !== 'undefined'" controls="true") Your browser does not support the video element.
    source(:src="link(block.data.id)")
  p.secondary.center(v-else) Video not selected
</template>

<script>
import {mapGetters} from "vuex";
import {Axios} from "@/axios/axios";

export default {
  name: "VideoReader",
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

    nameId(id, name){
      if (name.length > 30) {
        name = name.slice(0,30) + '...'
      }
      return id + "-" + name
    },
    link(id){
      return Axios.generateMediaLink(id.slice(0, id.indexOf("-")))
    }
  }
}
</script>

<style scoped lang="stylus">

.video
  width 100%
</style>
