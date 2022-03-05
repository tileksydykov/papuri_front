<template lang="pug">
Notifications
div(:style="{'display': 'inline-flex'}").w-100
  SideNav
  router-view
</template>

<script>
import {mapGetters} from "vuex";
import Header from "./components/Header";
import SideNav from "./components/SideNav";
import Notifications from "./components/notifications/Notifications";

export default {
  name: 'App',
  components: {Notifications, SideNav, Header},
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
  },

  watch:{
    theme(val){
      document.documentElement.dataset.theme = val;
    },
    title(val) {
      document.title = val
    }
  }
}
</script>

<style lang="stylus" src="./styles/app.styl"></style>
