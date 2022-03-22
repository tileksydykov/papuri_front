<template lang="pug">
.menu
  router-link(:to="{name: 'Index'}")
    font-awesome-icon(icon="home").menu-icon
  router-link(:to="{name: 'Index'}")
    font-awesome-icon(icon="search").menu-icon
  router-link(:to="{name: 'Index'}")
    font-awesome-icon(icon="book").menu-icon
  router-link(:to="{name: 'Index'}")
    font-awesome-icon(icon="bookmark").menu-icon
  router-link(:to="{name: 'Media'}")
    font-awesome-icon(icon="images").menu-icon
  router-link(:to="{name: 'CreateRepo'}")
    font-awesome-icon(icon="plus").menu-icon
</template>

<script>
export default {
  name: "MobileMenu"
}
</script>

<style scoped lang="stylus">
.menu
  display flex
  flex-shrink revert
  background black
  color white
  justify-content space-evenly
  .menu-icon
    color #a3a3a3
    padding 20px 10px
</style>
