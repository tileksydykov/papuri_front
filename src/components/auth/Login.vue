<template lang="pug">

Header
br
.title {{ $t("login") }}
.login-form
  .input-wrapper
    input(v-model="email" placeholder="Email" type="email")
  .input-wrapper
    input(v-model="password" placeholder="Password" type="password")
  .input-wrapper
    button.btn.black-btn.noot(@click="submit") {{ $t("login") }}
    router-link(:to="{name: 'Reg'}") {{ $t("signUp") }}
</template>

<script>
import {mapGetters} from "vuex";
import Header from "../Header";

export default {
  name: "Login",
  components: {Header},
  data() {
    return {
      email: "",
      password: ""
    }
  },
  metaInfo: {
    title: "Login",
    i18n: "login"
  },
  computed: {
     ...mapGetters({
       loggedIn: "getLoggedIn"
     })
  },
  methods: {
    submit(){
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password
      })
    }
  },
  mounted() {
    if (this.loggedIn){
      this.$router.push({name: 'Index'})
    }
    this.setTitle(this.$t("login"))
  },
  watch: {
    loggedIn(val){
      if (val) {
        this.$router.push({name: 'Index'})
      }
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
