<template lang="pug">
label Branch
br
input(v-model="name" placeholder="Name of the branch")
br
br
label Base commit
br
select(v-model="commitId")
  option(
    v-for="commit in commits"
    :key="commit.id"
    :value="commit.id"
     ) {{ commit.message }}
hr
div.d-flex.flex-center
  .btn(@click="close") Close
  .btn.btn-cyan(@click="create") Create
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: "AddBranchModal",
  data() {
    return {
      name: "",
      commitId: 0
    }
  },
  methods: {
    ...mapMutations({
      setModalOpen: "setModalState"
    }),
    ...mapActions({
      createBranch: "repo/createBranch"
    }),
    close(){
      this.setModalOpen(false)
    },
    async create() {
      if (this.name === "" || this.commitId === "") {
        return
      }
      const res = await this.createBranch({
        username: this.repo.user_name,
        repo: this.repo.name,
        name: this.name,
        from: this.commitId
      })
      if (res) {
        this.close()
      }
    }
  },
  computed: {
    ...mapGetters({
      commits: "repo/getCommits",
      repo: "repos/getCurrent"
    })
  }
}
</script>

<style scoped lang="stylus">

</style>
