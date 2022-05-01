<template lang="pug">
span Message
textarea(v-model="message" placeholder="Commit message")
div.d-flex.button-cont
  button.btn.btn-cyan(@click="finish") Commit
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Commit",
  data(){
    return {
      message: ""
    }
  },
  computed: {
    ...mapGetters({
      repo: "repos/getCurrent",
      branch: "repo/getSelectedBranch"
    })
  },
  methods: {
    ...mapActions({
      send: "repo/finishCommit",
      fetch: "repo/fetchCommits"
    }),
    async finish(){
      const res = await this.send({
        username: this.repo.user_name,
        repo: this.repo.name,
        message: this.message,
        branch: this.branch
      })
      if (res) {
        this.message = ""
        await this.fetch({
          username: this.repo.user_name,
          repo: this.repo.name,
        })
      }
    }
  }
}
</script>

<style scoped lang="stylus">
textarea
  width 100% !important
.button-cont
  flex-direction row-reverse
</style>
