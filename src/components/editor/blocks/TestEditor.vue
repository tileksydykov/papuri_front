<template lang="pug">
.test-cont
  span Test
  br
  input(v-model="block.data.title" @change="save" placeholder="title").title-input

  hr
  template(v-for="(opt, index) in block.data.options")
    .d-flex
      input(type="checkbox" ).checkbox
      input(:value="opt" @change="changeOpt($event, index)" placeholder="option").option-input
      font-awesome-icon(icon="times" @click="deleteOption(index)").times
  .clickable.btn(@click="addOption") + Add Option
</template>

<script>
import {debounce} from "@/components/editor/blocks/functions";

export default {
  name: "TestEditor",
  props: {
    block: {
      type: Object,
      required: true,
    }
  },
  methods: {
    changeOpt(evt, index){
      let block = this.block
      block.data.options[index] = evt.target.value
      this.save()
    },
    save(){
      debounce( () => {
        this.$emit("save", this.block)
      }, 1000)()
    },
    addOption(){
      let block = this.block
      block.data.options.push('')
    },
    deleteOption(index) {
      let block = this.block
      block.data.options.splice(index, 1)
      this.save()
    }
  },
}
</script>

<style scoped lang="stylus">
.test-cont
  padding 10px
  .btn
    font-size 13px
  .times
    margin-top 7px
    margin-left 5px
  .checkbox
    margin-top 8px
    margin-right 5px

input
  padding 4px
  margin 2px
.title-input
  width 100%
.option-input
  width 100%


</style>
