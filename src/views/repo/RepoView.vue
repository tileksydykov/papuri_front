<template lang="pug">
.page-wrapper
  .container
    .loading(v-if="!repo.name")
      .self-center.w-33.loading-background
      .self-center.w-25.loading-background
      .self-center.w-50.loading-background
      .self-center.w-50.d-flex
        .w-25.m-5.loading-background.d-flex
        .w-25.m-5.loading-background.d-flex
        .w-25.m-5.loading-background.d-flex
        .w-25.m-5.loading-background.d-flex
    .center(v-else="repo")
      .title {{ repo.name }}
      .desc(v-html="repo.desc")
      br
      .center.tabs
        label.clickable.m-5.tab-item(
            v-for="tab in tabs"
            :class="{active:  (tab.active) }"
            @click="$router.push({name: tab.name, params: $route.params})"
            v-show="!tab.private || owner"
          ) {{ tab.name }}
    hr
    router-view
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: "RepoView",
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      user: 'getUser',
      repo: "repos/getCurrent",
    }),
    owner() {
      return this.user && this.user.id
    },
    tabs(){
      let tabs = [
        {
          name: "RepoOverview",
          private: false
        }, {
          name: "Volumes",
          private: false
        }, {
          parent: "Editor",
          name: "RepoEditor",
          private: true
        }
      ]
      tabs.forEach(tab => {
        tab.active = this.isActiveRoute(tab, this.$route)
      })
      return tabs
    },
  },
  methods: {
    ...mapActions({
      get: "repos/fetchCurrent",
      getFiles: "repo/fetchFiles",
      getInfo: "repo/fetchRepoInfo",
    }),
    ...mapMutations({
      setRepo: "repos/setCurrent"
    }),
  },
  async mounted() {
    // empty the state
    this.setRepo({})
    this.getFiles(this.$route.params)
    this.getInfo(this.$route.params)
    await this.get(this.$route.params)
  },
  watch: {}
}
</script>

<style lang="stylus" scoped>

</style>
