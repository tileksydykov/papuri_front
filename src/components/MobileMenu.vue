<template lang="pug">
.menu
  router-link(
    :to="{name: 'Index'}"
    :class="{active: activeIcon === 'Index'}"
  )
    font-awesome-icon(icon="home").menu-icon
  router-link(
    :to="{name: 'Search'}"
    :class="{active: activeIcon === 'Search'}"
  )
    font-awesome-icon(icon="search").menu-icon
  router-link(
    :to="{name: 'CurrentBook'}"
    :class="{active: activeIcon === 'CurrentBook'}"
  )
    font-awesome-icon(icon="book").menu-icon
  router-link(
    :to="{name: 'Bookmarks'}"
    :class="{active: activeIcon === 'Bookmarks'}"
  )
    font-awesome-icon(icon="bookmark").menu-icon
  router-link(
    :to="{name: 'Media'}"
    :class="{active: activeIcon === 'Media'}"
  )
    font-awesome-icon(icon="images").menu-icon
  router-link(
    :to="{name: 'CreateRepo'}"
    :class="{active: activeIcon === 'CreateRepo'}"
  )
    font-awesome-icon(icon="plus").menu-icon
</template>

<script>
export default {
  name: "MobileMenu",
  computed: {
    activeIcon(){
      return this.$route.name
    }
  }
}
</script>

<style scoped lang="stylus">
.menu
  display flex
  flex-shrink revert
  background black
  color white
  justify-content space-around
  .menu-icon
    color #a3a3a3
    font-size 18px
    padding 20px 15px
  .active
    .menu-icon
      color white
</style>
