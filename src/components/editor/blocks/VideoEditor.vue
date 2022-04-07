<template lang="pug">
.p-5
  span Video <br>
  small.secondary upload all needed media in "Media" and select there
  br
  select( v-model="block.data.id" @change="save")
    option(
      v-for="m in media"
      :key="m.id"
      :value="nameId(m.id, m.name)"
      :selected="nameId(m.id, m.name) === block.data.id")
      | {{ nameId(m.id, m.name) }}
  br
  br
  video.video(v-if="block.data.id && block.data.id !== 'undefined'" controls="true") Your browser does not support the video element.
    source(:src="link(block.data.id)")
  p.secondary.center(v-else) Video not selected
</template>

<script>
import {mapGetters} from "vuex";
import {Axios} from "@/axios/axios";

export default {
  name: "VideoEditor",
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
      console.log("saved")
      this.$emit("save", this.block)
    },
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
select
  padding 0
  border-radius 0
.video
  width 100%
</style>
