<template lang="pug">
Folder(:thisFolder="{id: 0, name: 'Repo'}")
</template>

<script>
import Folder from "./Folder";
export default {
  name: "FileTree",
  components: {Folder}
}
</script>

<style lang="stylus" scoped>

</style>
