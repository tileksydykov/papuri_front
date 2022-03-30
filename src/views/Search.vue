<template lang="pug">
.page-wrapper
  .container
    Header
    h1 Search
    p hello
</template>

<script>
import Header from "@/components/Header";
export default {
  name: "Search",
  components: {Header},
  mounted() {
    this.setTitle("Search")
  }
}
</script>

<style scoped lang="stylus">

</style>
