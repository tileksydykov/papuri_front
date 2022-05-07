<template lang="pug">
.p-5
  audio(v-if="block.data.id && block.data.id !== 'undefined'" controls="true") Your browser does not support the audio element.
    source(:src="link(block.data.id)")
</template>

<script>
import {mapGetters} from "vuex";
import {Axios} from "@/axios/axios";

export default {
  name: "AudioReader",
  props: {
    block: {
      type: Object,
      required: true,
    }
  },
  computed: {
    ...mapGetters({
      media: "media/getAudios"
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
select
  padding 0
  border-radius 0
</style>
