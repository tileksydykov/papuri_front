<template lang="pug">
.page-wrapper
  .container
    Header
    br
    .noto.bold.bigger {{ $t("recentlyAdded") }}
    RepoList
</template>

<script>
import Date from "../../components/util/Date";
import LoginButtons from "../../components/util/LoginButtons";
import {mapGetters} from "vuex";
import Header from "../../components/Header";
import RepoList from "../../components/repo/RepoList";

export default {
  components: {Header, LoginButtons, Date, RepoList},
  computed: {
    ...mapGetters({
      theme: "getTheme",
      loggedIn: "getLoggedIn",
      user: "getUser",
    }),
    user_name() {
      return this.user ? this.user.user_name: ''
    }
  },
  methods: {

  },
  mounted() {

  }
}
</script>

