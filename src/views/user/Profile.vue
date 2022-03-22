<template lang="pug">
.page-wrapper(v-if="user")
  .container
    Header
    .center.title {{ user.first_name }} {{ user.last_name }}
    .center.name @{{ user.user_name }}
    br
    .center.tabs
      label.m-5.tab-item.clickable(
        v-for="tab in tabs"
        :class="{active: $route.name === tab.name}"
        @click="$router.push({name: tab.name, params: {username: user.user_name}})"
        ) {{ tab.name }}
    hr
    router-view
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import BookList from "../../components/repo/RepoList";
import Header from "../../components/Header";

export default {
  name: 'Profile',
  components: {Header, BookList},
  data(){
    return {
      tabs: [
        {
          name: "Activity"
        },{
          name: "MyRepos"
        },{
          name: "Settings"
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      loggedIn: "getLoggedIn",
      user: 'getUser',
    })
  },
  methods: {
    ...mapActions({
      logOut: "logout",
    })
  },
  mounted(){
  },
  watch: {
    loggedIn(val){
      if (!val) {
        this.$router.push({name: "Index"})
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
