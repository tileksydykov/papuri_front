<template lang="pug">
.files
  li(v-for="file in files" :key="file.id" ) {{ file.path }}
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Settings",
  computed: {
    ...mapGetters({
      files: 'repo/getFiles'
    })
  }
}
</script>
