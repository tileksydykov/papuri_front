<template lang="pug">
router-link.clickable(:to="{name: 'CreateRepo'}") Создать новую книгу
RepoList(:repos="repos")
</template>

<script>
import RepoList from "../repo/RepoList";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "MyRepos",
  components: {RepoList},
  computed: {
    ...mapGetters({
      repos: "repos/listMyRepos"
    })
  },
  methods: {
    ...mapActions({
      loadMyRepos: "repos/getMyRepos"
    })
  },
  mounted() {
    this.loadMyRepos()
  }
}
</script>

<style scoped>

</style>
