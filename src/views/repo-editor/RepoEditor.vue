<template lang="pug">
.page-wrapper
  .f-container
    .editor
      Editor
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Editor from "../../components/editor";

export default {
  name: "RepoEditor",
  components: {Editor},
  data(){
    return {

    }
  },
  computed: {
    ...mapGetters({
      repo: "repos/getCurrent",
      files: "repos/listFiles",
    }),
    listOne () {
      return this.items.filter(item => item.list === 1)
    },
    listTwo () {
      return this.items.filter(item => item.list === 2)
    }
  },
  methods: {
    ...mapActions({
      openWs: "repos/beginWs"
    }),


  },
  mounted () {
    this.openWs({id: this.$route.params.id})
  }
}
</script>

<style scoped lang="stylus">



</style>
