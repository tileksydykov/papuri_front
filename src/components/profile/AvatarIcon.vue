<template lang="pug">
.avatar-icon(ref="avatar")
  div(v-if="isNullIcon") {{ title }}
</template>

<script>
export default {
  name: "AvatarIcon",
  props: {
    user: {
      type: Object,
      required: true,
    },
    size: {
      type: Number,
      required: false,
      default: 30
    }
  },
  data() {
    return {
      title: "A",
      isNullIcon: true
    }
  },
  watch: {
    user(val) {
      this.isNullIcon = !(val.img) || val.img === ''
      if (this.isNullIcon) {
        this.title = this.capitalize(val.user_name)
        this.$refs.avatar.style.backgroundColor = '#00b40b'
      } else if (val.img) {
        this.$refs.avatar.style.backgroundImage = `url(${val.img})`
      }
    },
    size(val) {
      this.setSize(val)
    }
  },
  methods: {
    setSize(val) {
      const icon = this.$refs.avatar;
      icon.style.height = val + 'px';
      icon.style.width = val + 'px';
      icon.style.fontSize = val - 15 + 'px'
    },
    capitalize(name){
      return name.charAt(0).toUpperCase()
    }
  },
  mounted() {
    let  val = this.user
    this.isNullIcon = !(val.img) || val.img === ''
    if (this.isNullIcon) {
      this.title = this.capitalize(val.user_name)
      this.$refs.avatar.style.backgroundColor = '#00b40b'
    } else {
      this.$refs.avatar.style.backgroundImage = `url(${val.img})`
    }
    this.setSize(this.size)
  }
}
</script>

<style scoped lang="stylus">
.avatar-icon
  color white
  border-radius 10px
  display inline-flex
  background-size cover
  background-repeat no-repeat
  div
    text-align center
    width 100%
    padding-top 5px
</style>
