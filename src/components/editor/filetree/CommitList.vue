<template lang="pug">
b Commits
ul
  li(v-for="commit in commits" :key="commit")
    .card-commit
      .date.right.secondary {{ date(commit.updated_at) }}
      .title {{ commit.message }}

</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "CommitList",
  computed: {
    ...mapGetters({
      commits: "repo/getCommits"
    })
  },
  methods: {
    date(date){
      return this.dayjs(date).format("MM/DD HH:mm")
    }
  }
}
</script>

<style scoped lang="stylus">
ul
  list-style none
  padding 0
  margin 0
li
  .card-commit
    margin 3px
    border 1px solid $light_lines_color
    padding 4px
    .title
      font-size 13px
      font-weight bold
    .date
      font-size 12px
</style>
