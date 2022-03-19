<template lang="pug">
.login-buttons
  router-link(:to="{name: 'Login'}").sign-in {{ $t("login") }}
  router-link(:to="{name: 'Reg'}").sign-up.noto.black-btn.btn() {{ $t("signUp") }}
</template>

<script>
export default {
  name: "LoginButtons"
}
</script>

<style scoped lang="stylus">
.login-buttons
  display flex
  font-size 15px
  padding-top 5px
  .sign-in
    padding 7px 10px
    cursor pointer
    text-decoration none
    color $text_color
  .sign-up
    background black
    color white
    text-decoration none
    border-radius 4px
    font-weight 500
</style>
