<template lang="pug">
.page-wrapper
  .container
    Header
    h2.noto {{ readingRepo.title }}
</template>

<script>
import Header from "@/components/Header";
import {mapGetters} from "vuex";
export default {
  name: "CurrentBook",
  components: {Header},
  computed: {
    ...mapGetters({
      readingRepo: "repos/getReading"
    })
  }
}
</script>

<style scoped lang="stylus">

</style>
