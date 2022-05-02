<template lang="pug">
.page-wrapper
  .container
    Header
    .search.right
      input(placeholder="Search ...." v-model="query")
    h1 Search
    p Results count:
      b {{ results.length }}
    ul
      li(v-for="repo in results" :key="repo.id")
        .results-date.right.secondary.small {{ date(repo.created_at) }}
        .results-title.clickable(
          @click="$router.push({name: 'RepoOverview', params: {username: repo.user_name, repo: repo.name}})"
          ) {{ repo.title }}
        .results-name {{ repo.name }}
</template>

<script>
import Header from "@/components/Header";
import {mapActions, mapGetters} from "vuex";
import {debounce} from "@/components/editor/blocks/functions";
export default {
  name: "Search",
  components: {Header},
  data(){
    return {
      query: ""
    }
  },
  mounted() {
    this.setTitle("Search")
  },
  methods: {
    ...mapActions({
      search: "repos/search"
    }),
    date(date){
      return this.dayjs(date).format("MM/DD HH:mm")
    }
  },
  computed: {
    ...mapGetters({
      results: "repos/listSearchResults"
    })
  },
  watch: {
    query(val){
      debounce( () => {
        this.search(val)
      }, 400)()
    }
  }
}
</script>

<style scoped lang="stylus">
.search
  margin-top 30px
  input
    padding 10px 40px
    border none
    background $light_lines_color
    border-radius 20px
    outline none
    font-size 16px
ul
  margin 0
  padding 0
  list-style none
  li
    margin 5px
    border 1px solid $light_lines_color
    padding 5px
    border-radius 5px
    .results-title
      font-size 20px
      font-weight bold

</style>
