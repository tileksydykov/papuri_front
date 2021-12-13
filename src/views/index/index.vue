<template lang="pug">
.page-wrapper
  .container
    .card
      .card-body
        | Привет случайный пользователь
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import BookList from "../../components/book/BookList";

export default {
  components: {BookList},
  computed: {
    ...mapGetters({
      popular: "books/getPopular"
    })
  },
  methods: {
    ...mapActions({
      loadBooks: "books/fetchPopular"
    })
  },
  mounted() {
    this.loadBooks({page: 1})
  }
}
</script>

