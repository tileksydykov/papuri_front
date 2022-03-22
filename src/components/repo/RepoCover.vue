<template lang="pug">
.cover(:style="style")
  .noto.name(:style="titleFontSize") {{ repo.title }}
  br
  hr
  .noto.author(:style="secondaryFontSize") {{ author }}
  .noto.year(:style="secondaryFontSize") {{ year }}
</template>

<script>
import * as dayjs from "dayjs";

export default {
  name: "RepoCover",
  props: {
    repo: {
      type: Object,
      required: true,
    },
    size: {
      type: Number,
      required: true,
      default: 150,
    }
  },
  computed: {
    year (){
      return dayjs(this.repo.created_at).year()
    },
    author(){
      return this.repo.user ? this.repo.user.first_name + " " + this.repo.user.last_name: "not signed"
    },
    style() {
      return {
        height: this.size * 1.4 + 'px',
        width: this.size + 'px',
      }
    },
    titleFontSize(){
      return {
        'font-size': this.size * 0.11 + 'px',
        height: this.size * 0.8 + 'px'
      }
    },
    secondaryFontSize(){
      return {
        'font-size': this.size * 0.09 + 'px'
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.cover
  background #005c6d
  color white
  padding 10px
.name
  text-transform capitalize
  font-size 1.4em
  word-break break-word
.author
  text-transform capitalize
</style>
