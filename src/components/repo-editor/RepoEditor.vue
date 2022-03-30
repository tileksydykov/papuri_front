<template lang="pug">
.page-wrapper
  .container
    .editor
      Header
      Editor
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import Editor from "../editor";
import Header from "../Header";

export default {
  name: "RepoEditor",
  components: {Header, Editor},
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
      openWs: "repos/beginWs",
      get: "repos/fetchCurrent",
      getFiles: "repo/fetchFiles",
      getInfo: "repo/fetchRepoInfo",
    }),
    ...mapMutations({
      setRepo: "repos/setCurrent"
    }),
    handle(markdownText){
      const htmlText = markdownText
          .replace(/^### (.*$)/gim, '<h3>$1</h3>')
          .replace(/^## (.*$)/gim, '<h2>$1</h2>')
          .replace(/^# (.*$)/gim, '<h1>$1</h1>')
          .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
          .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
          .replace(/\*\*(.*)/gim, '<b>$1</b>')
          .replace(/\*(.*)\*/gim, '<i>$1</i>')
          .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
          .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
          .replace(/\n$/gim, '<br />')

      return htmlText.trim()
    }
  },
  mounted () {
    // this.openWs({id: this.$route.params.id})
    this.setRepo({})
    this.getFiles(this.$route.params)
    this.getInfo(this.$route.params)
    this.get(this.$route.params)
  }
}
</script>

<style scoped lang="stylus">



</style>
