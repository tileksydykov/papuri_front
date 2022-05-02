<template lang="pug">
div
  div
    label.label Title
  input(v-model="current.title")
div
  div
    label.label Description
  textarea(v-model="current.description")
div
  label.label Private repository
  input(v-model="current.private" type="checkbox")
hr
button.btn.black-btn(@click="saveRepo") Save
span(v-if="saved").f-green Saved
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "RepoSettings",
  data(){
    return{
      saved: false
    }
  },
  computed: {
    ...mapGetters({
      current: "repos/getCurrent"
    })
  },
  methods: {
    ...mapActions({
      save: "repos/updateRepo"
    }),
    async saveRepo(){
      this.saved = false
      this.saved = await this.save(this.current)
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
