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
      br
      br
      a.clickable(@click="auto") Auto Generate
    .input-wrapper(v-if="nameGenerated.length > 0 && nameAuto")
      span Auto Generated Repo Id:
      b &nbsp;{{ nameGenerated }}&nbsp;
      a.clickable(@click="change") Change
    .input-wrapper
    button.btn.black-btn(@click="createBook" :class="{deactivated: name === '' && nameGenerated === ''}") Создать
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
    async createBook() {
      const book = {
        name: this.nameAuto ? this.nameGenerated : this.name,
        title: this.title
      }
      if (book.name === "") {
        return
      }
      let repo = await this.create(book)
      await this.$router.push({name: 'RepoEditor', params: {username: repo.user_name, repo: repo.name}})
    },
    change(){
      this.name = this.nameGenerated
      this.nameAuto = false
    },
    auto(){
      this.nameAuto = true
    }
  },
  watch: {
    title(val) {
      const createRepoID = (title) => {
        let id = ""
        id = this.translit(title)

        return id
      }
      this.nameGenerated = createRepoID(val)
    }
  }
}
</script>

<style scoped lang="stylus">
.deactivated
  cursor not-allowed
</style>
