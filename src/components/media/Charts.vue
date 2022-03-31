<template lang="pug">
.charts
  DoughnutChart.chart(:chartData="chartData")
  DoughnutChart.chart(:chartData="fileTypesData")
</template>

<script>
import { DoughnutChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import Charts from "../../components/media/Charts";
Chart.register(...registerables);
export default {
  name: "Charts",
  components: {DoughnutChart, Charts},
  props: {
    chartData: {
      type: Object,
    },
    fileTypesData: {
      type: Object
    }
  }
}
</script>

<style scoped lang="stylus">
.charts
  display flex
  justify-content center
  .chart
    height 200px
    width 50%
@media screen and (max-width: 620px)
  .charts
    flex-direction column
    .chart
      width 100%
</style>
