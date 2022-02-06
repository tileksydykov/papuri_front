<template lang="pug">
p(v-if="!file") file not choosen
.editors-container(v-else)
  p {{ file.name }}
  textarea(v-model="file.content")
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "FileEditor",
  computed: {
    ...mapGetters({
      file: "repo/getSelectedFile"
    })
  }
}
</script>

<style scoped lang="stylus">

</style>
