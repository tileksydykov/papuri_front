<template lang="pug">
.p-5
  img.image.center(:src="link(block.data.imageId)")
</template>

<script>
import {mapGetters} from "vuex";
import {Axios} from "@/axios/axios";

export default {
  name: "ImageReader",
  props: {
    block: {
      type: Object,
      required: true,
    }
  },
  computed: {
    ...mapGetters({
      media: "media/getImages"
    }),
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
.image
  width auto
  max-width 100%
  max-height 500px
</style>
