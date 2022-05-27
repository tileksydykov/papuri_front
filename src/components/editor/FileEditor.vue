<template lang="pug">
p(v-if="!file").center {{ $t("fileNotChosen") }}
.editors-container(v-else)
  h2 {{ file.name }}
  template(v-if="blocks")
    .d-flex(v-if="blocks.length > 0")
      .blocks
        .block(
          v-for="(block, index) in blocks"
          :key="block.id")
            div(
              @dragover.prevent
              @dragenter.prevent
              @drop="onDrop($event, block)"
            )
              .d-flex
                .block-menu
                  .block-menu-icon
                    font-awesome-icon(
                      icon="times"
                      @click="deleteBlock(index)"
                      )
                  .block-menu-icon(
                      @dragstart="startDrag($event, block)"
                      draggable="true"
                    )
                    font-awesome-icon(icon="dragon")
                .block-content
                  component(
                    :is="block.container + 'Editor'"
                    :block="block"
                    @save="saveBlock"
                  )
        BlockAdder(@add="add")
      //.preview()
      //  Reader(:content="file.content")
    template(v-else)
      .center
        p Пока нет блоков в этом файле. Создайте новый
        BlockAdder(@add="add")
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
import Reader from "../reader/Reader";
import blockinfo from "../../engine/blockinfo";
import BlockAdder from "./blocks/util/BlockAdder";
import KatexEditor from "./blocks/KatexEditor";
import YoutubeEditor from "./blocks/YoutubeEditor";

export default {
  name: "FileEditor",
  components: {
    BlockAdder,
    Reader,
    TextEditor,
    VideoEditor,
    ImageEditor,
    TestEditor,
    AudioEditor,
    KatexEditor,
    YoutubeEditor,
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
    deleteBlock(index){
      this.blocks.splice(index, 1)
      this.saveBlock()
    },
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
    add(blockName) {
      let block = blockinfo[blockName]
      this.addBlock(block)
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
  width 100%
  .block
    .block-menu
      width 30px
      border-right 1px solid $lines_color
      .block-menu-icon
        font-size 20px
        height 30px
        width 30px
        text-align center
        margin-top 5px
    .block-content
      width 100%
.preview
  width 50%

.block
  margin 10px
  box-shadow 1px 1px 5px grey

.editors-container
  padding 0 10px

</style>
