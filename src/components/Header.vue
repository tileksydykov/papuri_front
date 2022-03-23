<template lang="pug">
.header
  LoginButtons.right(v-if="!loggedIn")
  .user(v-if="loggedIn").right
    .menu.m-hidden
       router-link(:to="{name: 'Index'}")
        font-awesome-icon(icon="home").menu-icon
       router-link(:to="{name: 'Search'}")
        font-awesome-icon(icon="search").menu-icon
       router-link(:to="{name: 'CurrentBook'}")
        font-awesome-icon(icon="book").menu-icon
       router-link(:to="{name: 'Bookmarks'}")
        font-awesome-icon(icon="bookmark").menu-icon
       router-link(:to="{name: 'Media'}")
        font-awesome-icon(icon="images").menu-icon
       router-link(:to="{name: 'CreateRepo'}")
        font-awesome-icon(icon="plus").menu-icon
    router-link(
      :to="{name: 'Activity', params: { username: user_name }}"
    ).user-info
      .title.noto {{ user.first_name }} {{ user.last_name }}
      .username.right @{{ user.user_name }}
    AvatarIcon(
      :user="user"
      :size="30"
    ).icon
  Date
</template>

<script>
import {mapGetters} from "vuex";
import LoginButtons from "./util/LoginButtons";
import Date from "./util/Date";
import BookList from "./repo/RepoList";
import AvatarIcon from "./profile/AvatarIcon";

export default {
  name: "Header",
  components: {LoginButtons, Date, BookList, AvatarIcon},
  computed: {
    ...mapGetters({
      loggedIn: "getLoggedIn",
      user: "getUser",
      isFixed: "isMenuFixed"
    }),
    user_name() {
      return this.user ? this.user.user_name: 'A'
    }
  },
  methods: {
  }
}
</script>

<style lang="stylus" scoped>
.user
  display flex
  .title
    color $text_color
    text-decoration none
    padding-top 3px
    font-size 15px
  .username
    font-size 12px
    color $text_secondary
  .icon
    margin 7px
.menu
  display flex
  padding 10px 20px
  font-size 20px
  .menu-icon
    color $text_secondary
    padding 0 10px
</style>
