<template lang="pug">
.test-cont
  b {{ block.data.title }}
  hr
  template(v-for="(opt, index) in block.data.options")
    .d-flex
      input(type="checkbox" ).checkbox
      span {{ opt }}
</template>

<script>
export default {
  name: "TestReader",
  props: {
    block: {
      type: Object,
      required: true,
    }
  },
  methods: {

  },
}
</script>

<style scoped lang="stylus">
.test-cont
  padding 10px
  .btn
    font-size 13px
  .times
    margin-top 7px
    margin-left 5px
  .checkbox
    margin-top 8px
    margin-right 5px


</style>
