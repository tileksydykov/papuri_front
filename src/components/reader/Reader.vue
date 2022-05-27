<template lang="pug">
template(v-if="blocks")
  template(v-for="block in blocks")
    component(:is="block.container + 'Reader'" :block="block")
template(v-else)
  .secondary.center No content
</template>

<script>
import {Engine} from "../../engine";
import AudioReader from "./blocks/AudioReader";
import ImageReader from "./blocks/ImageReader";
import TestReader from "./blocks/TestReader";
import TextReader from "./blocks/TextReader";
import VideoReader from "./blocks/VideoReader";
import KatexReader from "./blocks/KatexReader";
import YoutubeReader from "./blocks/YoutubeReader";

export default {
  name: "Reader",
  components: {
    AudioReader,
    ImageReader,
    TestReader,
    TextReader,
    VideoReader,
    KatexReader,
    YoutubeReader
  },
  props: {
    content: {
      required: true,
      type: String,
    }
  },
  computed: {
    blocks() {
      return Engine.fromTextToBlocks(this.content)
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
