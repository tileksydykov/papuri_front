<template lang="pug">
.page-wrapper
  .container
    | create book
    .p-10
      input(v-model="name" placeholder="Title")
    button.btn(@click="createBook({name})") Создать
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "BookCreate",
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
      let bookFromDb = await this.create(book)
      this.$router.push({name: 'Chapters', params: bookFromDb})
    }
  }
}
</script>

<style scoped>

</style>
