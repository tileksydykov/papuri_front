<template lang="pug">
.card
  .card-body
    .login-form
      .card-body
        input(v-model="email" placeholder="Email" type="email")
      .card-body
        input(v-model="password" placeholder="Password" type="password")
      button(@click="submit") Зарегистрироваться
</template>

<script>
export default {
  name: "Registration",
  data() {
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    submit(){
      this.$store.dispatch("register", {
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>
