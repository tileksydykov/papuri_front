<template lang="pug">
ul
  li(v-for="repo in repos")
    router-link(:to="{name: 'Editor', params: {id: repo.id}}") {{ repo.name }}
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  methods: {
    ...mapActions({
      getAll: "repos/getAll"
    })
  },
  computed: {
    ...mapGetters({
      repos: 'repos/listAll'
    })
  },
  mounted() {
    this.getAll()
  }
}
</script>
