<template lang="pug">
.loader
  .lds-dual-ring
</template>

<script>
export default {
  name: "Loader"
}
</script>

<style scoped lang="stylus">
.loader
  width 100%
  display flex
  height 100%
  justify-content center
.lds-dual-ring
  display inline-block
  width 65px
  height 65px

.lds-dual-ring:after
  content " "
  display block
  width 35px
  height 35px
  margin 8px
  border-radius 50%
  border 6px solid $link_color
  border-color $link_color transparent $link_color transparent
  animation lds-dual-ring 1.2s linear infinite

@keyframes lds-dual-ring
  0%
    transform rotate(0deg)
  100%
    transform rotate(360deg)

</style>
