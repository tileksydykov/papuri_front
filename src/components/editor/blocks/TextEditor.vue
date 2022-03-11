<template lang="pug">
textarea(v-model="block.data.text" @keyup="save")
</template>

<script>
let timeout;
function debounce(callback, wait) {
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(function () { callback.apply(this, args); }, wait);
  };
}
export default {
  name: "TextEditor",
  props: {
    block: {
      type: Object,
      required: true,
      default: () => {
        return {
          data: {
            text: ''
          }
        }
      }
    }
  },
  data(){
    return {
      text: '',
    }
  },
  mounted() {
    this.text = this.block.data.text
  },
  methods: {
    save(){
      debounce( () => {
        this.$emit("save", this.block)
      }, 1000)()
    }
  }
}
</script>

<style scoped lang="stylus">
textarea
  width 100%
  border-radius 0
  border none
  outline none
</style>
