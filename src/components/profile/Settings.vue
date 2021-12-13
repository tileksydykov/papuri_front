<template lang="pug">
p(@click="logOut").clickable Выйти
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "Settings",
  methods: {
    ...mapActions({
      logOut: "logout",
    })
  },
}
</script>

<style scoped>

</style>
