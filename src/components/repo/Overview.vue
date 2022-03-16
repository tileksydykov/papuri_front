<template lang="pug">
.stats Count: {{ info.files_count }} Size: {{ size(info.files_size) }}
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Overview",
  computed: {
    ...mapGetters({
      info: "repo/getInfo"
    })
  },
  methods: {
    size(bytes){
      return this.bytesToSize(bytes)
    }
  }
}
</script>
