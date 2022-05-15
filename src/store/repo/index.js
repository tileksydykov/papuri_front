import {findFile, orderFiles, saveContent, saveFile, setFolderEditing} from "./functions";
import {Axios} from "@/axios/axios";
import {Engine} from "@/engine";

export default {

    namespaced: true,

    state: {
        files: [],
        folders: [],
        root: [],
        selectedFileId: '',
        blocks: [],
        info: {},
        branches: [],
        commits: [],
        selectedBranch: ""
    },

    mutations: {
        setFolders: (state, data) => state.folders = data,
        setRoot: (state, data) => state.root = data,
        setBranches: (state, data) => state.branches = data,
        setSelectedBranch: (state, data) => state.selectedBranch = data,
        setCommits: (state, data) => state.commits = data,
        setBlocks: (state, data) => state.blocks = data,
        setInfo: (state, data) => state.info = data,
        addBlocks: (state, data) => state.blocks.push(data),
        setFiles: (state, data) => {
            state.files = data
            let file = data.find(f => f.id === state.selectedFileId)
            if (!file) {
                file = data.find(f => f.fork_from === state.selectedFileId)
                state.selectedFileId = file ? file.id: ''
            }
        },
        selectFile: (state, id) => {
            state.selectedFileId = id
            const file = findFile(state.root[0], state.selectedFileId).content
            if (file) state.blocks = Engine.fromTextToBlocks(file)
            else state.blocks = []
        },
        addFiles: (state, file) => {
            state.files.push(file)
            state.root = orderFiles(JSON.parse(JSON.stringify(state.files)))
        },
        saveFile: (state, file) => {
            saveFile(state.root, file)
        },
        saveContent: (state, file) => {
            saveContent(state.root, file)
        },
        saveFolder: (state, folder) => {
            setFolderEditing(state.root, folder)
        }
    },
    getters: {
        getBlocks: state => state.blocks,
        getFolders: state => state.folders,
        getRoot: state => state.root,
        getBranches: state => state.branches,
        getCommits: state => state.commits,
        getSelectedBranch: state => state.selectedBranch,
        getFiles: state => state.files,
        getInfo: state => state.info,
        getFilesByFolderId: state => id => {
            return state.files.filter(f => f.folderId === id)
        },
        getFoldersByFolderId: state => id => state.folders.filter(f => f.parent === id),
        getSelectedFile: state => findFile(state.root[0], state.selectedFileId),
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
        moveFile(ctx, {fileId, toFolder, username, repo}) {
            const files = ctx.getters.getFiles.map(f => {
                if (f.id === fileId){
                    f.folderId = toFolder.id
                    f.path = toFolder.path + '/' + f.name
                    ctx.dispatch('updateFiles', {username, repo, files: [{id: f.id, path: f.path}]})
                }
                return f
            })
            ctx.commit('setFiles', files)
        },
        async createFile(ctx, {username, repo, file}) {
            ctx.commit('saveFile', file)
            const url = `api/v1/repos/files/${username}/${repo}`
            let res = await Axios.post(url, file, {
                params: {
                    branch: ctx.state.selectedBranch
                }
            })
            if ( res.status === 200 ) {
                ctx.dispatch('fetchFiles', {username, repo})
                ctx.commit('saveFile', file)
            }
        },
        async fetchFiles(ctx, {username, repo}) {
            const url = `api/v1/repos/files/${username}/${repo}`
            const branch = ctx.state.selectedBranch
            if (!branch) {
                return
            }
            let res = await Axios.get(url, {params: {branch}})
            if (res.status === 200){
                const folder = orderFiles(res.data.result)
                ctx.commit('setRoot', folder)
                ctx.commit('setFiles', res.data.result)
            }
        },
        async fetchBranches(ctx, {username, repo}){
            const url = `api/v1/repos/branches/${username}/${repo}`
            let res = await Axios.get(url)
            if (res.status === 200) {
                ctx.commit('setBranches', res.data.result)
                ctx.commit('setSelectedBranch', res.data.result[0])
                return res.data.result
            }
            return []
        },
        async createBranch(ctx, {username, repo, name, from}){
            const url = `api/v1/repos/branches/${username}/${repo}`
            let res = await Axios.post(url, {name, from})
            if (res.status === 200) {
                ctx.dispatch("fetchCommits")
                ctx.dispatch("fetchFiles")
                return true
            }
            return false
        },
        async fetchCommits(ctx, {username, repo}) {
            const url = `api/v1/repos/commits/${username}/${repo}`
            const branch = ctx.state.selectedBranch
            if (!branch) {
                return
            }
            let res = await Axios.get(url, {params: {branch}})
            if (res.status === 200){
                ctx.commit('setCommits', res.data.result)
            }
        },
        async finishCommit(ctx, {username, repo, message, branch}){
            const url = `api/v1/repos/commits/${username}/${repo}`
            let res = await Axios.post(url, {
                message
            }, {
                params: {
                    branch
                }
            })
            return res.status === 200;
        },
        async updateFiles (ctx, {username, repo, files}) {
            const url = `api/v1/repos/files/${username}/${repo}`
            let res = await Axios.patch(url, files, {params: {branch: ctx.state.selectedBranch}})
            if (res.status === 200) {
                const folder = orderFiles(res.data.result)
                ctx.commit('setRoot', folder)
                ctx.commit('setFiles', res.data.result)
            }
        },
        async fetchRepoInfo (ctx, {username, repo}) {
            const url = `api/v1/repos/info/${username}/${repo}`
            let res = await Axios.get(url)
            if (res.status === 200) {
                ctx.commit('setInfo', res.data.result)
            }
        },
        getFileById: (ctx, id)=> {
            return  ctx.state.files.find(f => f.id === id)
        },
        getFileByPrevId: (ctx, id)=> {
            return  ctx.state.files.find(f => f.prev_file_id === id)
        },
        async selectBranch(ctx, {branch, username, repo}) {
            ctx.commit("setSelectedBranch", branch)
            ctx.dispatch("fetchFiles", {username, repo})
            ctx.dispatch("fetchCommits", {username, repo})
        }
    }
}
