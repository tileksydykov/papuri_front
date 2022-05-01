<template lang="pug">
Notifications
div.router
  router-view
MobileMenu.m-only
ModalContainer
</template>

<script>
import {mapGetters} from "vuex";
import Header from "./components/Header";
import Notifications from "./components/notifications/Notifications";
import MobileMenu from "./components/MobileMenu";
import ModalContainer from "./components/modals/ModalContainer";

export default {
  name: 'App',
  components: {ModalContainer, MobileMenu, Notifications, Header},
  computed: {
    ...mapGetters({
      loggedIn: "getLoggedIn",
      theme: "getTheme",
      title: "title"
    })
  },
  methods: {
  },
  mounted() {
    this.$store.dispatch("appMounted");
    this.setTitle("Main")
  },

  watch: {
    theme(val){
      document.documentElement.dataset.theme = val;
    },
    title(val){
      document.title = val
    }
  }
}
</script>

<style lang="stylus" src="./styles/app.styl"></style>
