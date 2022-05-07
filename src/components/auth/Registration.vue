<template lang="pug">
Header
br
.title {{ $t("signUp") }}
.login-form
  .input-wrapper
    input(v-model="name" placeholder="Name" required="true" type="email")
  .input-wrapper
    input(v-model="surname" placeholder="Surname" required="true" type="text")
  .input-wrapper
    input(v-model="email" placeholder="Username" required="true" type="text")
  .input-wrapper
    input(v-model="password" placeholder="Password" required="true" type="password")
  .input-wrapper
    button.btn.black-btn.noot(@click="submit") {{ $t("signUp") }}
    router-link(:to="{name: 'Login'}") {{ $t("login") }}
</template>

<script>
import Header from "../Header";

export default {
  components: {Header},
  name: "Registration",
  data() {
    return {
      email: "",
      password: "",
      name: "",
      surname: "",
    }
  },
  methods: {
    async submit(){
      let isRegistered = await this.$store.dispatch("register", {
        email: this.email,
        surname: this.surname,
        name: this.name,
        password: this.password
      })
      isRegistered && await this.$router.push({name: "Index"})
    }
  }
}
</script>
