<template lang="pug">
.header
  LoginButtons.right(v-if="!loggedIn")
  .user(v-if="loggedIn").right
    .menu.m-hidden
       router-link(
         :to="{name: 'Index'}"
         :class="{active: activeIcon === 'Index'}"
         ).f-cyan
        font-awesome-icon(icon="home").menu-icon
       router-link(
         :to="{name: 'Search'}"
         :class="{active: activeIcon === 'Search'}"
         ).f-blue
        font-awesome-icon(icon="search").menu-icon
       router-link(
         :to="{name: 'CurrentBook'}"
         :class="{active: activeIcon === 'CurrentBook'}"
         ).f-red
        font-awesome-icon(icon="book").menu-icon
       router-link(
         :to="{name: 'Bookmarks'}"
         :class="{active: activeIcon === 'Bookmarks'}"
         ).f-green
        font-awesome-icon(icon="bookmark").menu-icon
       router-link(
         :to="{name: 'Media'}"
         :class="{active: activeIcon === 'Media'}"
         ).f-yellow
        font-awesome-icon(icon="images").menu-icon
       router-link(
         :to="{name: 'CreateRepo'}"
         :class="{active: activeIcon === 'CreateRepo'}"
         ).f-light-blue
        font-awesome-icon(icon="plus").menu-icon
    router-link(
      :to="{name: 'Activity', params: { username: user_name }}"
    ).user-info
      .title.noto {{ user.first_name }} {{ user.last_name }}
      .username.right.f-light-blue @{{ user.user_name }}
    AvatarIcon(
      :user="user"
      :size="30"
    ).icon
  .d-flex
    Date
    .change-theme
      font-awesome-icon(
        v-if="theme === 'dark'"
        icon="sun"
        @click="setTheme('light')"
        )
      font-awesome-icon(
        @click="setTheme('dark')"
        v-if="theme === 'light'"
        icon="moon"
        )
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import LoginButtons from "./util/LoginButtons";
import Date from "./util/Date";
import BookList from "./repo/RepoList";
import AvatarIcon from "./profile/AvatarIcon";

export default {
  name: "Header",
  components: {LoginButtons, Date, BookList, AvatarIcon},
  data(){
    return {

    }
  },
  computed: {
    ...mapGetters({
      loggedIn: "getLoggedIn",
      user: "getUser",
      isFixed: "isMenuFixed",
      theme: "getTheme"
    }),
    user_name() {
      return this.user ? this.user.user_name: 'A'
    },
    activeIcon(){
      return this.$route.name
    }
  },
  methods: {
    ...mapMutations({
      setTheme: "setTheme"
    })
  },
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
  padding 2px 20px
  font-size 20px
  a
    transition 0.4s
    padding 3px 11px
    margin 5px
  .active
    background $background_selected_color
    border-radius 5px
    .menu-icon
      color $text_color !important
.change-theme
  padding 12px
  svg
    height 25px
    width 25px
</style>
