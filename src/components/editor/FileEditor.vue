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
        .add-button(@click="addText") +&nbsp;
          font-awesome-icon(icon="envelope-open-text")
        .add-button(@click="addImage") +&nbsp;
          font-awesome-icon(icon="image")
        .add-button(@click="addVideo") +&nbsp;
          font-awesome-icon(icon="video")
        .add-button(@click="addAudio") +&nbsp;
          font-awesome-icon(icon="file-audio")
        .add-button(@click="addTest") +&nbsp;
          font-awesome-icon(icon="file-alt")
    .preview( v-html="preview" )
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import TextEditor from "./text-editor/TextEditor";
import VideoEditor from "./VideoEditor";
import ImageEditor from "./ImageEditor";
import TestEditor from "./TestEditor";
import AudioEditor from "./AudioEditor";
import {Engine} from "../../engine";

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
      blocks: [],
      lastId: 20,
    }
  },
  computed: {
    ...mapGetters({
      file: "repo/getSelectedFile"
    }),
    preview () {
      return this.file.content.replaceAll('\n', '<br>')
    }
  },
  methods: {
    ...mapMutations({
      saveContent: "repo/saveContent"
    }),
    render(){
      this.saveContent(Engine.fromBlocksToText(this.blocks))
    },
    addText(){
      this.blocks.push({
        id: ++this.lastId,
        container: 'TextEditor',
        data: {
          text: ''
        },
      })
      this.render()
    },
    addVideo(){
      this.blocks.push({
        id: ++this.lastId,
        container: 'VideoEditor',
        data: {
          videoId: ''
        },
      })
      this.render()
    },
    addImage(){
      this.blocks.push({
        id: ++this.lastId,
        container: 'ImageEditor',
        data: {
          imageId: ''
        },
      })
      this.render()
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
      this.render()
    },
    addAudio(){
      this.blocks.push({
        id: ++this.lastId,
        container: 'AudioEditor',
        data: {
          audioId: ''
        },
      })
      this.render()
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
      this.render()
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
