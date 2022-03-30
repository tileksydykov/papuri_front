<template lang="pug">
.page-wrapper
  .container
    Header
    h2.noto Media
    Charts(:chartData="chartData" :fileTypesData="fileTypesData")
    p Total files: {{ info.media_count }} Size: {{ size(info.media_size) }} from {{ size(info.media_allowed) }}
    FileUpload
    hr
    ul.files
      li.file-item(v-for="f in files" )
        .image
          .image-preview( v-if="isImage(f.type)" :style="{'background-image': `url(${link(f.id)})`}")
        .name.noto(:title="cutName(f.name)") {{ f.id }}-{{ cutName(f.name) }}
        .size {{ size(f.size) }}
    hr
    br
    br
</template>

<script>
import FileUpload from "@/components/file-upload/FileUpload";
import {mapActions, mapGetters} from "vuex";
import Header from "../../components/Header";
import {Axios} from "../../axios/axios";
import {IMAGE_TYPES} from "../../constants/constants";
import Charts from "../../components/media/Charts";

export default {
  name: "Media",
  components: {Header, FileUpload, Charts},
  computed: {
    ...mapGetters({
      files: 'media/files',
      info: 'media/info'
    }),
    chartData(){
      if (this.info) {
        return {
          labels: ['Files', 'Empty'],
          datasets: [
            {
              data: [this.info.media_size, this.info.media_allowed - this.info.media_size],
              backgroundColor: ['#4850ff', '#e7e7e7'],
            },
          ],
        }
      }
      return {labels: [],datasets: []}
    },
    fileTypesData(){
      if (this.info) {
        const labels = []
        const data = []
        if (this.info.media_types) {
          this.info.media_types.forEach(type => {
            // if(type.type === ""){
            //   labels.push("other")
            // }else {
            //   labels.push(type.type)
            // }
            data.push(type.sum)
          })
        }
        return {
          labels,
          datasets: [
            {
              data,
              backgroundColor: [
                '#4d54ff',
                '#ff6b6b',
                '#6bff7f',
                '#b8992a',
                '#c234ea',
                '#2d9300',
                '#3a0097',
                '#000000',
                '#ff0000',
              ],
            },
          ],
        }
      }
      return {labels: [],datasets: []}
    }
  },
  data(){
    return {

    }
  },
  methods: {
    ...mapActions({
      fetchFiles: 'media/getFiles',
      fetchInfo: 'media/fetchMediaInfo',
    }),
    size(bytes){
      return this.bytesToSize(bytes)
    },
    cutName(name){
      return name.split('.').slice(0, -1).join('')
    },
    isImage(type){
      return IMAGE_TYPES.indexOf(type) > -1
    },
    link(id){
      return Axios.generateMediaLink(id)
    }
  },
  mounted() {
    this.fetchFiles()
    this.fetchInfo()
  }
}
</script>

<style scoped lang="stylus">
.files
  list-style none
  padding 0
  display flex
  flex-wrap wrap
  flex-direction row
  justify-content center
  .file-item
    width 100px
    height 100px
    border 1px solid $light_lines_color
    margin 5px
    padding 10px
    .size
      font-size 12px
      overflow hidden
      height 14px
      text-overflow ellipsis
      display -webkit-box
      -webkit-line-clamp 1
      -webkit-box-orient vertical
    .name
      overflow hidden
      height 18px
      font-size 13px
      text-overflow ellipsis
      display -webkit-box
      -webkit-line-clamp 1
      -webkit-box-orient vertical
      font-weight bold
      cursor pointer
    .image
      height 70px
      width 100%
      .image-preview
        width 100%
        height 100%
        background-size 100%
        background-position center

</style>
