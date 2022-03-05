<template lang="pug">
.page-wrapper
  .container
    p {{ chapter.title }}
    div(v-html="chapter.text")
    br
    ChapterComments(:chapter="chapter")
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import ChapterComments from "../../components/comment/ChapterComments";

export default {
  name: "ChapterView",
  components: {ChapterComments},
  methods: {
    ...mapActions({
      fetchChapter: "chapters/fetchChapter"
    })
  },
  computed: {
    ...mapGetters({
      chapter: "chapters/getCurrentChapter"
    })
  },
  mounted() {
    this.fetchChapter({id: this.$route.params.id})
  }
}
</script>

<style scoped lang="stylus">

</style>
