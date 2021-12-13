<template lang="pug">
.page-wrapper
  .container
    .loading(v-if="book && book.loading")
      .self-center.w-33.loading-background
      .self-center.w-25.loading-background
      .self-center.w-50.loading-background
      .self-center.w-50.d-flex
        .w-25.m-5.loading-background.d-flex
        .w-25.m-5.loading-background.d-flex
        .w-25.m-5.loading-background.d-flex
        .w-25.m-5.loading-background.d-flex
    .center(v-else="book")
      .title {{ book.title }}
      .desc(v-html="book.desc")
      br
      .center.tabs
        label.clickable.m-5.tab-item(
            v-for="tab in tabs"
            :class="{active:  (tab.active) }"
            @click="$router.push({name: tab.name, params: {id: book.id}})"
            v-show="!tab.private || owner"
          ) {{ tab.name }}
    hr
    router-view
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: "BookView",
  data() {
    return {
      data: 0,

    }
  },
  computed: {
    ...mapGetters({
      book: 'books/getCurrentBook',
      user: 'getUser',
      relation: 'books/getCurrentBookRelation'
    }),
    owner() {
      return this.user && this.user.id && this.user.id === this.book.user_id
    },
    tabs(){
      let tabs = [
        {
          name: "Chapters",
          private: false
        }, {
          name: "Volumes",
          private: false
        }, {
          parent: "CreateToBook",
          name: "CreateVolume",
          private: true
        }, {
          parent: "BookSettings",
          name: "EditBook",
          private: true
        }
      ]
      tabs.forEach(tab => {
        tab.active = this.isActiveRoute(tab, this.$route)
      })
      return tabs
    },
  },
  methods: {
    ...mapActions({
      get: "books/fetchBook",
      loadVolumes: "books/fetchBookVolumes",
      clearCurrentBook: "books/clearCurrentBook",
      setViewToCurrentBook: "books/setView"
    }),
    ...mapMutations({
      setBook: "books/setCurrentBook",
      setVolumes: "books/setCurrentVolumes"
    }),
    count(){
      this.data ++
    },

    setView() {
      if ((this.relation && this.relation.id) && (this.book && this.book.id) && (!this.relation.viewed)) {
        this.setViewToCurrentBook()
      }
    }
  },
  mounted() {
    console.log("mounted")
    if (this.book.id != this.$route.params.id) {
      this.clearCurrentBook()
    }
    this.get({id: this.$route.params.id})
    this.loadVolumes({id: this.$route.params.id})
  },
  watch: {
    book() {
      this.setView()
    },
    relation() {
      this.setView()
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
