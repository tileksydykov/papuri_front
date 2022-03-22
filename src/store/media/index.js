import {Axios} from "@/axios/axios";
import {uuidv4} from "@/store/repo/functions";
import {getExt} from "@/store/media/functions";

export default {
    namespaced: true,
    state: {
        files: [],
        info: {},
        uploadingFiles: []
    },
    getters: {
        uploadingFiles: state => state.uploadingFiles,
        files: state => state.files,
        info: state => state.info,
        getImages: state => state.files.filter( file => {
            const exts = ["jpg", "png", "gif", "jpeg", "raw"]
            return exts.indexOf(getExt(file.name)) > -1
        }),
        getVideos: state => state.files.filter( file => {
            const exts = ["mp4"]
            return exts.indexOf(getExt(file.name)) > -1
        }),
        getAudios: state => state.files.filter( file => {
            const exts = ["mp3"]
            return exts.indexOf(getExt(file.name)) > -1
        })
    },
    mutations: {
        addUploadingFile: (state, file) => state.uploadingFiles.push(file),
        setFiles: (state, files) => state.files = files,
        setInfo: (state, info) => state.info = info,
        updateUploadingFile: (state, file) => state.uploadingFiles = state.uploadingFiles.map(f => f.id === file.id ? file: f),
    },
    actions: {
        upload(ctx, file){
            file.id = uuidv4()
            let formData = new FormData();
            formData.append("file", file);
            file.uploadedSize = 0;
            ctx.commit('addUploadingFile', file)
            Axios.put('/api/v1/media', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    file.uploadedSize = progressEvent.loaded
                    ctx.commit('updateUploadingFile', file)
                }
            })
        },
        async updateMedia(ctx){
            if (ctx.getters.files.length < 1) {
                ctx.dispatch('getFiles')
            }
        },
        async getFiles(ctx) {
            let files = await Axios.get('/api/v1/media')
            if (files.status === 200) {
                ctx.commit('setFiles', files.data.result)
            }
        },
        async fetchMediaInfo(ctx) {
            let files = await Axios.get('/api/v1/media/info')
            if (files.status === 200) {
                ctx.commit('setInfo', files.data.result)
            }
        }
    }
}
