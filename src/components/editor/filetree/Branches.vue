<template lang="pug">

span Branch &nbsp;
font-awesome-icon(
  icon="plus"
  @click="openAddBranches"
  ).right.add-branch
select
  option(v-for="branch in branches" :key="branch" :selected="selected === branch") {{ branch }}
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "Branches",
  computed: {
    ...mapGetters({
      selected: "repo/getSelectedBranch"
    })
  },
  methods: {
    ...mapMutations({
      set: "repo/setSelectedBranch",
      setModal: "setModalContainer",
      openModal: "setModalState"
    }),
    openAddBranches(){
      this.setModal("AddBranchModal")
      this.openModal(true)
    }
  },
  props: {
    branches: {
      type: Array,
      required: true,
    }
  }
}
</script>

<style scoped lang="stylus">
select
  padding 2px
.add-branch
  margin-top 5px
  cursor pointer
</style>
