
export default {
    namespaced: true,
    state: {
        files: [
            {
                id: 1,
                name: 'index.txt',
                content: '',
                folderId: 2
            },
            {
                id: 3,
                name: 'main.txt',
                content: '',
                folderId: 2
            },
            {
                id: 2,
                name: 'himik.txt',
                content: '',
                folderId: 2
            },
            {
                id: 4,
                name: 'tilek.txt',
                content: '',
                folderId: 2
            }
        ],
        folders: [
            {
                id: 1,
                name: 'folder 1',
                parent: 0
            },
            {
                id: 2,
                name: 'folder 2',
                parent: 1
            },
            {
                id: 3,
                name: 'folder 3',
                parent: 0
            },
        ],
        selectedFileId: -1,
    },
    mutations: {
        setFolders: (state, data) => state.folders = data,
        setFiles: (state, data) => state.files = data,
        selectFile: (state, id) => state.selectedFileId = id
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
            if (isChild(folders, folders.find(f => f.id === toFolder), folderId)) return
            folders = folders.map(f => f.id === folderId ? {...f, parent: toFolder}: f)
            ctx.commit('setFolders', folders)
        },
        moveFile(ctx, {fileId, toFolder}){
            const files = ctx.getters.getFiles.map(f => f.id === fileId ? {...f, folderId: toFolder}: f)
            ctx.commit('setFiles', files)
        },
    }
}
