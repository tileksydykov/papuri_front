<template lang="pug">
.date.noto
  .day {{ day }}
  .date-right
    .week-day {{ weekDay }}
    .month-year {{ monthYear }}
</template>

<script>
import * as dayjs from "dayjs";

export default {
  name: "Date",
  data(){
    return {
      date: new Date()
    }
  },
  computed: {
    day() {
      return dayjs(this.date).format("DD")
    },
    weekDay() {
      return dayjs(this.date).format("ddd")
    },
    monthYear() {
      return dayjs(this.date).format("MMM YYYY")
    }
  }
}
</script>

<style scoped lang="stylus">
.date
  display flex
  .day
    font-size 35px
    font-weight bold
    padding 0 5px
    min-width max-content
  .date-right
    color $text_secondary
    padding-top 9px
    line-height 16px
    font-size 12px
    min-width max-content
</style>
