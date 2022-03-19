<template lang="pug">
ul.repo-list
  li.repo-card(v-for="repo in repos")
    .date {{ date(repo) }}
    router-link.title(:to="link(repo)") {{ repo.name }}
    br
    span.username {{ repo.user_name }}
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import * as dayjs from 'dayjs'

export default {
  name: "RepoList",
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
  .repo-card
    border 1px dashed $lines_color
    padding 10px
    margin 3px
    .title
      font-size 20px
      color $text_color
      text-decoration none
    .date
      float right

</style>
