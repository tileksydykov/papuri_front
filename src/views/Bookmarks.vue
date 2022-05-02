<template lang="pug">
.page-wrapper
  .container
    Header
    h1 Bookmarks
    p.secondary.center(v-if="readings.length < 1")
    ul.readings-list
      li(v-for="reading in readings" :key="reading.id")
        .item
          .d-flex.clickable(
            @click="$router.push({name: 'RepoOverview', params: {username: reading.repo.user_name, repo: reading.repo.name}})"
          )
            RepoCover(:repo="reading.repo" :size="100")
            .item-info
              .title {{ reading.repo.title }}
              span {{ reading.repo.name }}
              .date Last opened at:&nbsp;
                b {{ date(reading.updated_at) }}
</template>

<script>
import Header from "@/components/Header";
import {mapActions, mapGetters} from "vuex";
import RepoCover from "@/components/repo/RepoCover";

export default {
  name: "Bookmarks",
  components: {RepoCover, Header},
  computed: {
    ...mapGetters({
      readings: "repos/readings"
    })
  },
  methods: {
    ...mapActions({
      fetch: "repos/fetchReadings"
    }),
    date(date){
      return this.dayjs(date).format("DD.MM.YYYY HH:mm")
    }
  },
  mounted() {
    this.fetch()
  }
}
</script>

<style scoped lang="stylus">
.readings-list
  padding 0
  list-style none
  .item
    list-style none
    padding 10px
    .item-info
      padding 0 10px
</style>
