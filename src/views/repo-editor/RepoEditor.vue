<template lang="pug">
.page-wrapper
  .f-container
    .editor
      .file-manager
        SlVueTree(v-model="nodes")
        p {{ repo.name }}
        ul
          li(v-for="fileName in files") {{ fileName }}
      .ed
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import SlVueTree from "../../components/editor/tree";

export default {
  name: "RepoEditor",
  components: {SlVueTree},
  data(){
    return {
      nodes: [
        {title: 'Item1', isLeaf: true},
        {title: 'Item2', isLeaf: true, data: { visible: false }},
        {title: 'Folder1'},
        {
          title: 'Folder2', isExpanded: true, children: [
            {title: 'Item3', isLeaf: true},
            {title: 'Item4', isLeaf: true}
          ]
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      repo: "repos/getCurrent",
      files: "repos/listFiles",
    })
  },
  methods: {
    ...mapActions({
      openWs: "repos/beginWs"
    })
  },
  mounted () {
    this.openWs({id: this.$route.params.id})
  }
}
</script>

<style scoped lang="stylus"></style>
