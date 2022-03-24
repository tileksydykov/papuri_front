<template lang="pug">
router-link(:to="{name: 'CurrentBook'}" @click="makeCurrentReading")
  button.btn.black-btn() Читать
.stats Count: {{ info.files_count }} Size: {{ size(info.files_size) }}
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "Overview",
  computed: {
    ...mapGetters({
      info: "repo/getInfo",
    })
  },
  methods: {
    ...mapMutations({
      makeCurrentReading: "repos/makeCurrentReading"
    }),
    size(bytes){
      return this.bytesToSize(bytes)
    }
  },
  mounted() {
    this.setTitle()
  }
}
</script>
