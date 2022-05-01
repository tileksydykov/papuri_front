<template lang="pug">
p(v-if="!file").center {{ $t("fileNotChosen") }}
.editors-container(v-else)
  h2 {{ file.name }}
  template(v-if="blocks")
    .d-flex(v-if="blocks.length > 0")
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
              component(
                :is="block.container"
                :block="block"
                @save="saveBlock"
                )
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
    template(v-else)
      .center
        p Пока нет блоков в этом файле. Создайте новый
        .d-flex.flex-center
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
  template(v-else)
    p loading ...
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import TextEditor from "./blocks/TextEditor";
import VideoEditor from "./blocks/VideoEditor";
import ImageEditor from "./blocks/ImageEditor";
import TestEditor from "./blocks/TestEditor";
import AudioEditor from "./blocks/AudioEditor";
import {Engine} from "@/engine";
import {uuidv4} from "@/store/repo/functions";

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
      lastId: 20,
      contentParsed: false,
    }
  },
  computed: {
    ...mapGetters({
      file: "repo/getSelectedFile",
      repo: "repos/getCurrent",
      blocks: "repo/getBlocks"
    }),
    preview () {
      return Engine.fromBlockToHtml(Engine.fromTextToBlocks(this.file.content))
    }
  },
  mounted() {
    this.fetchMedia()
  },
  methods: {
    ...mapMutations({
      saveContent: "repo/saveContent",
      setBlocks: "repo/setBlocks",
      addBlocks: "repo/addBlocks"
    }),
    ...mapActions({
      updateFiles: "repo/updateFiles",
      fetchMedia: "media/getFiles"
    }),
    save(file){
      this.updateFiles({
        username: this.repo.user_name,
        repo: this.repo.name,
        files: [file]
      })
    },
    saveBlock(){
      this.file.content = Engine.fromBlocksToText(this.blocks)
      this.saveContent(this.file)
      this.save(this.file)
    },
    render(){
      this.file.content = Engine.fromBlocksToText(this.blocks)
      this.saveContent(this.file)
      this.save(this.file)
    },
    addText(){
      this.addBlock({
        container: 'TextEditor',
        data: {
          text: ''
        },
      })
    },
    addVideo(){
      this.addBlock({
        container: 'VideoEditor',
        data: {
          videoId: ''
        },
      })
    },
    addImage(){
      this.addBlock({
        container: 'ImageEditor',
        data: {
          imageId: '0'
        },
      })
    },
    addTest(){
      this.addBlock({
        container: 'TestEditor',
        data: {
          title: '',
          options: [''],
        },
      })
    },
    addAudio(){
      this.addBlock({
        container: 'AudioEditor',
        data: {
          audioId: ''
        },
      })
    },
    addBlock({container, data}) {
      this.addBlocks({
        id: uuidv4(),
        container,
        data,
      })
      this.render()
    },
    startDrag (evt, item) {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('itemID', item.id)
    },
    onDrop (evt, block) {
      const itemID = evt.dataTransfer.getData('itemID')

      const toIndex = this.blocks.indexOf(block);
      const fromIndex = this.blocks.indexOf(this.blocks.find(b => b.id === itemID))
      const arr = this.blocks.filter(() => true);
      const element = arr[fromIndex];
      arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, element);
      this.setBlocks(arr)
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
  background $background_color
  text-align center
  cursor pointer
.editors-container
  padding 0 10px

</style>
