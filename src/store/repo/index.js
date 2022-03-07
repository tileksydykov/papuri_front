import {orderFiles} from "./functions";

export default {
    namespaced: true,
    state: {
        files: [],
        folders: [],
        selectedFileId: -1,
    },
    mutations: {
        setFolders: (state, data) => state.folders = data,
        setFiles: (state, data) => state.files = data,
        selectFile: (state, id) => state.selectedFileId = id,
        addFiles: (state, file) => state.files.push(file),
        saveFile: (state, file) => {
            state.files.map(f => f.id === file.id ? file: f)
            const {files, folders} = orderFiles(state.files)
            state.files = files
            state.folders = folders
        }
    },
    getters: {
        getFolders: state => state.folders,
        getFiles: state => state.files,
        getFilesByFolderId: state => id => state.files.filter(f => f.folderId === id),
        getFoldersByFolderId: state => id => state.folders.filter(f => f.parent === id),
        getSelectedFile: state => state.files.find(f => f.id===state.selectedFileId),
    },
    actions: {
        moveFolder(ctx, {folderId, toFolder}){
            if (folderId === toFolder) return;
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
            folders = folders.map(f => f.id === folderId ? {...f, parent: toFolder}: f)
            ctx.commit('setFolders', folders)
        },
        moveFile(ctx, {fileId, toFolder}){
            const files = ctx.getters.getFiles.map(f => {
                if (f.id === fileId){
                    f.folderId = toFolder.id
                    f.path = toFolder.path + '/' + f.name

                }
                return f
            })
            ctx.commit('setFiles', files)
        },
    }
}
