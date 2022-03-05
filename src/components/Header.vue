<template lang="pug">
nav.navbar
    a.clickable.navbar-item( v-if="!isFixed" @click="toggleMenu")
      font-awesome-icon(icon="bars")
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Header",

  data(){
    return{

    }
  },
  computed: {
    ...mapGetters({
      loggedIn: "getLoggedIn",
      user: "getUser",
      isFixed: "isMenuFixed"
    }),
    user_name() {
      return this.user ? this.user.user_name: ''
    }
  },
  methods: {
    toggleMenu(){
      this.$store.commit("toggleMenu")
    }
  }
}
</script>

<style lang="stylus" scoped>
.navbar
  z-index 1000
  position fixed
  flex-direction row
  background $background_color
  border-bottom 1px solid $light_shadow_color
  box-shadow 1px 1px 3px $light_shadow_color
  width 100%
  text-align center
  padding 10px
  .navbar-item
    border-radius 3px
    padding 5px
    margin 3px
    color $text_color
    text-decoration none
    transition .3s
    &:hover
      background $light_shadow_color
  .right
    right 0
    left auto

</style>
