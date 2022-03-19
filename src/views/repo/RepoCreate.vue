<template lang="pug">
.page-wrapper
  .container
    Header
    br
    .title.noto Create repository
    .input-wrapper
      input(v-model="title" placeholder="Title")
    .input-wrapper(v-if="!nameAuto")
      input(v-model="name" placeholder="Name")
    .input-wrapper(v-if="nameGenerated.length > 0")
      span Auto Generated Repo Id:
      b &nbsp;{{ nameGenerated }}&nbsp;
      a Change
    .input-wrapper
      button.btn.black-btn(@click="createBook({name, title})") Создать
</template>

<script>
import {mapActions} from "vuex";
import Header from "../../components/Header";

export default {
  name: "RepoCreate",
  components: {Header},
  data(){
    return {
      name: "",
      title: "",
      nameGenerated: "",
      nameAuto: true,
    }
  },
  methods: {
    ...mapActions({
      create: "repos/create"
    }),
    async createBook(book) {
      let repo = await this.create(book)
      await this.$router.push({name: 'RepoEditor', params: {username: repo.user_name, repo: repo.name}})
    }
  },
  watch: {
    title(val) {
      const createRepoID = (title) => {
        let id = ""
        for (let i = 0; i < title.length; i++) {
          const charCode = title.charCodeAt(i)
          if (charCode <= 122 && charCode >= 97) {
            id += title.charAt(i)
          }
        }
        return id
      }
      this.nameGenerated = createRepoID(val)
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
