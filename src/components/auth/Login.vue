<template lang="pug">
.card
  .card-body
    .login-form
      .card-body
        input(v-model="email" placeholder="Email" type="email")
      .card-body
        input(v-model="password" placeholder="Password" type="password")
      button.btn(@click="submit") Войти
      hr
      router-link(:to="{name: 'Reg'}") Регистрация
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    }
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
  },
  watch:{
    loggedIn(val){
      if (val) {
        this.$router.push({name: 'Index'})
      }
    }
  }
}
</script>
