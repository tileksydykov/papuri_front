<template lang="pug">
.notifications-cont
  .notifications-wrapper
    transition-group(name="slide-fade")
      Notification(v-for="n in notifications" :key="n.id" :value="n")
</template>

<script>
import Notification from "./Notification";
import {mapGetters} from "vuex";

export default {
  name: "Notifications",
  components: {Notification},
  computed: {
    ...mapGetters({
      notifications: 'notification/getNotifications'
    })
  }
}
</script>

<style scoped lang="stylus">
.notifications-cont
  position fixed
  z-index 20000
  width 300px
  right 10px
  height auto
  bottom 10px
.slide-fade-enter-active
  transition all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0)
.slide-fade-leave-active
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0)
.slide-fade-enter, .slide-fade-leave-to
  transform translateX(10px)
  opacity 0
</style>
