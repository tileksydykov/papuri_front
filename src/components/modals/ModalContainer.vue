<template lang="pug">
div.modal-cont(v-if="modal.open")
  .modal(:style="style")
    font-awesome-icon(
      icon="times"
      @click="close"
      ).right.modal-close
    .modal-title {{ modal.title }}
    hr
    component(:is="modal.container")
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import AddBranchModal from "./AddBranchModal";

export default {
  name: "ModalContainer",
  components: {AddBranchModal},
  computed: {
    ...mapGetters({
      modal: "getModal"
    }),
    style(){
      return {
        width: this.modal.width + "px",
        "min-height": this.modal.height + "px",
        transform: `translateX(-${ this.modal.width / 2 }px) translateY(-${ this.modal.height / 2 }px)`
      }
    }
  },
  methods: {
    ...mapMutations({
      closeModal: "setModalState"
    }),
    close() {
      this.closeModal(false)
    }
  }
}
</script>

<style scoped lang="stylus">
.modal-cont
  position absolute
  top 0
  left 0
  height 100vh
  width 100vw
  backdrop-filter blur(5px)
  .modal
    background $background_color
    border 1px solid $light_lines_color
    margin-top 50vh
    margin-left 50vw
    padding 10px
  .modal-title
    min-height 16px
  .modal-close
    cursor pointer
  hr
    border 1px solid $light_lines_color
</style>
