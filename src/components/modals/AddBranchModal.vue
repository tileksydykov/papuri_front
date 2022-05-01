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
  .btn.btn-cyan(@click="") Create
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

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
    close(){
      this.setModalOpen(false)
    }
  },
  computed: {
    ...mapGetters({
      commits: "repo/getCommits"
    })
  }
}
</script>

<style scoped lang="stylus">

</style>
