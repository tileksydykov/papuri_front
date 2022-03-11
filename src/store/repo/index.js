import {orderFiles} from "./functions";
import {Axios} from "@/axios/axios";
import {Engine} from "@/engine";

export default {
    namespaced: true,
    state: {
        files: [],
        folders: [],
        selectedFileId: '',
        blocks: [],
    },
    mutations: {
        setFolders: (state, data) => state.folders = data,
        setBlocks: (state, data) => state.blocks = data,
        addBlocks: (state, data) => state.blocks.push(data),
        setFiles: (state, data) => state.files = data,
        selectFile: (state, id) => {
            state.selectedFileId = id
            state.blocks = Engine.fromTextToBlocks(state.files.find(f => f.id===state.selectedFileId).content)
        },
        addFiles: (state, file) => state.files.push(file),
        saveFile: (state, file) => {
            state.files.map(f => f.id === file.id ? file: f)
            const {files, folders} = orderFiles(state.files)
            state.files = files
            state.folders = folders
        },
        saveContent: (state, content) => {
            state.files = state.files.map(f => {
                if (f.id === state.selectedFileId) {
                    f.content = content
                }
                return f
            })

        }
    },
    getters: {
        getBlocks: state => state.blocks,
        getFolders: state => state.folders,
        getFiles: state => state.files,
        getFilesByFolderId: state => id => state.files.filter(f => f.folderId === id),
        getFoldersByFolderId: state => id => state.folders.filter(f => f.parent === id),
        getSelectedFile: state => state.files.find(f => f.id===state.selectedFileId),
    },
    actions: {
        moveFolder(ctx, {folderId, toFolder}){
            if (folderId === toFolder.id) return;
            let folders = ctx.getters.getFolders
            const isChild = (arr, folder, toId) => {
                if (!folder) {
                    return false
                }
                if (folder.parent === 0) {
                    return false
                }
                if (folder.parent === toId) {
                    return true
                }
                return isChild(arr, arr.find(f => f.id === folder.parent), toId);
            }
            if (isChild(folders, folders.find(f => f.id === toFolder.id), folderId)) return
            folders = folders.map(f => f.id === folderId ? {...f, parent: toFolder.id}: f)
            ctx.commit('setFolders', folders)
        },
        moveFile(ctx, {fileId, toFolder, username, repo}){
            const files = ctx.getters.getFiles.map(f => {
                if (f.id === fileId){
                    f.folderId = toFolder.id
                    f.path = toFolder.path + '/' + f.name
                }
                ctx.dispatch('updateFiles', {username, repo, files: [f]})
                return f
            })
            ctx.commit('setFiles', files)
        },
        async createFile(ctx, {username, repo, file}){
            ctx.commit('saveFile', file)
            const url = `api/v1/repos/files/${username}/${repo}`
            let res = await Axios.post(url, file)
            if ( res.status === 200 ) {
                ctx.commit('saveFile', file)
            }
        },
        async fetchFiles(ctx, {username, repo}){
            const url = `api/v1/repos/files/${username}/${repo}`
            let res = await Axios.get(url)
            if (res.status === 200){
                const {files, folders} = orderFiles(res.data.result)
                ctx.commit('setFolders', folders)
                ctx.commit('setFiles', files)
            }
        },
        async updateFiles (ctx, {username, repo, files}) {
            const url = `api/v1/repos/files/${username}/${repo}`
            let res = await Axios.patch(url, files)
            if (res.status === 200) {
                const {files, folders} = orderFiles(res.data.result)
                ctx.commit('setFolders', folders)
                ctx.commit('setFiles', files)
            }
        }
    }
}
