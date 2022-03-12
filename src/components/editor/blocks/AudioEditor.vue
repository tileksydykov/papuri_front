<template lang="pug">
.p-5
  span Audio <br>
  small.secondary upload all needed media in "Media" and select there
  br
  select( v-model="block.data.id" @change="save")
    option(
      v-for="m in media"
      :key="m.id"
      :value="nameId(m.id, m.name)"
      :selected="nameId(m.id, m.name) === block.data.id")
      | {{ nameId(m.id, m.name) }}
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "AudioEditor",
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
