<template lang="pug">
router-link.clickable(:to="{name: 'CreateBook'}") Создать новую книгу
BookList()
</template>

<script>
import BookList from "../book/BookList";

export default {
  name: "MyBooks",
  components: {BookList},
  computed:{
  },
  methods: {
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>
