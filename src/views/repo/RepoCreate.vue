<template lang="pug">
.page-wrapper
  .container
    br
    p create book
    .p-10
      input(v-model="name" placeholder="Title")
    button.btn(@click="createBook({name})") Создать
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "RepoCreate",
  data(){
    return {
      name: "",
    }
  },
  methods: {
    ...mapActions({
      create: "repos/create"
    }),
    async createBook(book){
      let repo = await this.create(book)
      await this.$router.push({name: 'RepoEditor', params: {username: repo.user_name, repo: repo.name}})
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
