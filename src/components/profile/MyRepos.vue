<template lang="pug">
router-link.clickable(:to="{name: 'CreateRepo'}") Создать новую книгу
BookList
</template>

<script>
import BookList from "../repo/RepoList";

export default {
  name: "MyRepos",
  components: {BookList},
  computed: {
  },
  methods: {
  },
  mounted() {}
}
</script>

<style scoped>

</style>
