<template lang="pug">
.page-wrapper
  .container
    Header
    br
    .noto.bold.bigger {{ $t("recentlyAdded") }}
    RepoList(:repos="repos")
</template>

<script>
import Date from "../../components/util/Date";
import LoginButtons from "../../components/util/LoginButtons";
import {mapActions, mapGetters} from "vuex";
import Header from "../../components/Header";
import RepoList from "../../components/repo/RepoList";

export default {
  components: {Header, LoginButtons, Date, RepoList},
  computed: {
    ...mapGetters({
      theme: "getTheme",
      loggedIn: "getLoggedIn",
      user: "getUser",
      repos: "repos/listAll"
    }),
    user_name() {
      return this.user ? this.user.user_name: ''
    }
  },
  methods: {
    ...mapActions({
      getRepos: "repos/getAll"
    })
  },
  mounted() {
    this.getRepos()
  }
}
</script>

