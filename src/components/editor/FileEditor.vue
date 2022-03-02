<template lang="pug">
p(v-if="!file") file not choosen
.editors-container(v-else)
  div.editor_header.right.d-flex
    div() split |
    div() | preview
  p {{ file.name }}
  .d-flex
    .blocks
      .block(
        v-for="block in blocks"
        :key="block.id")
          div(
            draggable="true"
            @dragover.prevent
            @dragenter.prevent
            @dragstart="startDrag($event, block)"
            @drop="onDrop($event, block)"
          )
            component(:is="block.container" :block="block")
      .block.d-flex
        .add-button(@click="addText") + Text
        .add-button(@click="addImage") + Image
        .add-button(@click="addVideo") + Video
        .add-button(@click="addAudio") + Audio
        .add-button(@click="addTest") + Test
    .preview( v-html="'<br> hello'" )
</template>

<script>
import {mapGetters} from "vuex";
import TextEditor from "./text-editor/TextEditor";
import VideoEditor from "./VideoEditor";
import ImageEditor from "./ImageEditor";
import TestEditor from "./TestEditor";
import AudioEditor from "./AudioEditor";

export default {
  name: "FileEditor",
  components: {
    TextEditor,
    VideoEditor,
    ImageEditor,
    TestEditor,
    AudioEditor,
  },
  data(){
    return {
      blocks: [
        {
          id: 0,
          container: 'TextEditor',
          data: {
            text: ''
          },
        }
      ],
      lastId: 20
    }
  },
  computed: {
    ...mapGetters({
      file: "repo/getSelectedFile"
    })
  },
  methods: {
    render(){},
    addText(){
      this.blocks.push({
        id: ++this.lastId,
        container: 'TextEditor',
        data: {
          text: ''
        },
      })
    },
    addVideo(){
      this.blocks.push({
        id: ++this.lastId,
        container: 'VideoEditor',
        data: {
          videoId: ''
        },
      })
    },
    addImage(){
      this.blocks.push({
        id: ++this.lastId,
        container: 'ImageEditor',
        data: {
          imageId: ''
        },
      })
    },
    addTest(){
      this.blocks.push({
        id: ++this.lastId,
        container: 'TestEditor',
        data: {
          title: '',
          options: [],
        },
      })
    },
    addAudio(){
      this.blocks.push({
        id: ++this.lastId,
        container: 'AudioEditor',
        data: {
          audioId: ''
        },
      })
    },
    startDrag (evt, item) {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('itemID', item.id)
    },
    onDrop (evt, block) {
      const itemID = parseInt(evt.dataTransfer.getData('itemID'))

      const toIndex = this.blocks.indexOf(block);
      const fromIndex = this.blocks.indexOf(this.blocks.find(b => b.id === itemID))
      const arr = this.blocks.filter(() => true);
      const element = arr[fromIndex];
      arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, element);
      this.blocks = arr;
    }
  }
}
</script>

<style scoped lang="stylus">
.blocks
  width 50%
.preview
  width 50%
.block
  margin 10px
  box-shadow 1px 1px 5px grey
.add-button
  margin 10px
  background white
  text-align center
  cursor pointer
</style>
