<template lang="pug">
ul.repo-list
  li.repo-card(v-for="repo in repos")
    RepoCover(:repo="repo" :size="120").self-center
    // .date.secondary {{ date(repo) }}
    br
    .secondary(v-if="repo.name.length === 0") no name
    .title
      router-link(v-if="repo.name" :to="link(repo)") {{ repo.title ? repo.title:"-|-"  }}
    span.repo_name(v-if="repo.name") @{{ repo.name }}
    small.username Author:
      router-link(:to="{name:'Profile', params: {username: repo.user_name}}") &nbsp;
        | {{ repo.user ? repo.user.first_name + ' ' + repo.user.last_name : repo.user_name }}
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import * as dayjs from 'dayjs'
import RepoCover from "./RepoCover";

export default {
  name: "RepoList",
  components: {RepoCover},
  methods: {
    ...mapActions({
      getAll: "repos/getAll"
    }),
    link(repo) {
      return {name: 'RepoOverview', params: {username: repo.user_name, repo: repo.name}}
    },
    date(repo){
      return dayjs(repo.created_at).format('DD.MM.YYYY HH:mm')
    }
  },
  computed: {
    ...mapGetters({
      repos: 'repos/listAll'
    })
  },
  mounted() {
    this.getAll()
  }
}
</script>

<style lang="stylus" scoped>
.repo-list
  margin 0
  padding 0
  list-style none
  display flex
  overflow-x auto
  .repo-card
    padding 10px
    margin 3px
    max-width 130px
    .title
      font-size 1em
      text-decoration none
      width 100%
      overflow hidden
      height 40px
      text-overflow ellipsis
      display -webkit-box
      -webkit-line-clamp 2
      -webkit-box-orient: vertical;
      a
        color $text_color
    .repo_name
      font-size 0.7em
      overflow hidden
      height 15px
      text-overflow ellipsis
      display -webkit-box
      -webkit-line-clamp 1
      -webkit-box-orient vertical
    .date
      width 100%
      font-size .7em

</style>
