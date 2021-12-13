<template lang="pug">
router-link.clickable(:to="{name: 'CreateBook'}") Создать новую книгу
BookList(v-bind="books")
</template>

<script>
import BookList from "../book/BookList";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "MyBooks",
  components: {BookList},
  computed:{
    ...mapGetters({
      books: "books/getMyBooks"
    })
  },
  methods: {
    ...mapActions({
      getBooks: "books/fetchMyBooks"
    })
  },
  mounted() {
    this.getBooks({page: 1})
  }
}
</script>

<style scoped>

</style>
