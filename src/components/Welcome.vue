<template lang="pug">
p.center.title Welcome to alatoo.kg
p.center This is new tool to create books and novels based on version control. Join us to learn more.
.d-flex.flex-center
  LoginButtons
</template>

<script>
import LoginButtons from "./util/LoginButtons";
export default {
  name: "Welcome",
  components: {LoginButtons}
}
</script>

<style scoped>

</style>
