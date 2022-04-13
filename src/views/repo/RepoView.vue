<template lang="pug">
.page-wrapper
  .container
    Header
    br
    .repository-view
      .repository-view-left
        RepoCover(:repo="repo" :size="200").self-center
        .loading(v-if="!repo.name")
          .w-25.loading-background
          .w-50.loading-background
        .repo-info
          .name {{ repo.name }}
          .stats
            font-awesome-icon(icon="file")
            span &nbsp;{{ info.files_count }}&nbsp;&nbsp;
            font-awesome-icon(icon="memory")
            span &nbsp;{{ size(info.files_size) }}
          .desc(v-html="repo.desc")
      .repository-view-right
        .loading(v-if="!repo.name")
          .w-33.loading-background
          .w-50.d-flex
            .w-25.m-5.loading-background.d-flex
            .w-25.m-5.loading-background.d-flex
            .w-25.m-5.loading-background.d-flex
            .w-25.m-5.loading-background.d-flex
        div(v-else="repo")
          .title {{ repo.title }}
          .tabs
            template(v-for="tab in tabs")
              label.clickable.m-5.tab-item(
                :class="{active:  (tab.active) }"
                @click="$router.push({name: tab.name, params: $route.params})"
                v-if="isRepoEditable(tab.private)"
              ) {{ tab.name }}
        hr
        router-view
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import Header from "../../components/Header";
import RepoCover from "../../components/repo/RepoCover";

export default {
  name: "RepoView",
  components: {RepoCover, Header},
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      user: 'getUser',
      repo: "repos/getCurrent",
      info: "repo/getInfo"
    }),
    owner() {
      return this.user && this.user.user_name === this.repo.user_name
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
          name: "RepoSettings",
          private: true
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
    isRepoEditable(isPrivate){
      if (!isPrivate) return true
      return this.repo ? this.owner : false
    },
    size(bytes){
      return this.bytesToSize(bytes)
    }
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
.repository-view
  display flex
  .repository-view-left
    padding 10px
    min-width 25%
  .repository-view-right
    min-width 75%
.repo-info
  margin-top 10px
  .title
    word-break break-word
@media screen and (max-width: 620px)
  .repository-view
    flex-direction column
</style>
