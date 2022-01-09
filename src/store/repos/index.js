import {Axios} from "../../axios/axios";

export default {
    namespaced: true,
    state: {
        current: {},
        all: [],
        files: [],
    },
    mutations: {
        setCurrent: (state, data) => state.current = data,
        setAll: (state, data) => state.all = data,
        setFiles: (state, data) => state.files = data,
    },
    getters: {
        getCurrent: state => state.current,
        listAll: state => state.all,
        listFiles: state => state.files,
    },
    actions: {
        create: async (ctx, {name}) => {
            await Axios.post("/api/v1/repos", {name})
        },
        getAll: async (ctx) => {
            let r = await Axios.get("/api/v1/repos")
            ctx.commit('setAll', r.data.result)
        },
        beginWs: async (ctx, {id}) => {
            await Axios.wsOpen(`/api/v1/repos/${id}/websocket`)
        },
        repo: async (ctx, repo) => {
            ctx.commit("setCurrent", repo)
        },
        files: async (ctx, list) => {
            ctx.commit("setFiles", list)
        }
    }
}
