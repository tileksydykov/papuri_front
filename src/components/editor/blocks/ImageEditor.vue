<template lang="pug">
.p-5
  span Image <br>
  small.secondary upload all needed media in "Media" and select there
  br
  select( v-model="block.data.imageId" @change="save")
    option(
      v-for="m in media"
      :key="m.id"
      :value="nameId(m.id, m.name)"
      :selected="nameId(m.id, m.name) === block.data.imageId")
      | {{ nameId(m.id, m.name) }}
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "ImageEditor",
  props: {
    block: {
      type: Object,
      required: true,
    }
  },
  computed: {
    ...mapGetters({
      media: "media/getImages"
    })
  },
  methods: {
    save(){
      this.$emit("save", this.block)
    },
    nameId(id, name){
      return id+"-"+name
    }
  }
}
</script>

<style scoped lang="stylus">
select
  padding 0
  border-radius 0
</style>
