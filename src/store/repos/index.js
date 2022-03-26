import {Axios} from "@/axios/axios";

export default {
    namespaced: true,
    state: {
        current: {},
        all: [],
        files: [],
        reading: {},
        readingFiles: {},
        readings: [],
    },
    mutations: {
        setCurrent: (state, data) => state.current = data,
        setAll: (state, data) => state.all = data,
        setFiles: (state, data) => state.files = data,
        setReadings: (state, data) => state.readings = data,
        setReadingFiles: (state, data) => state.readingFiles = data,
        setReading: (state, data) => state.reading = data,
        makeCurrentReading: (state) => state.reading = Object.assign({}, state.current)
    },
    getters: {
        getCurrent: state => state.current,
        listAll: state => state.all,
        listFiles: state => state.files,
        readings: state => state.readings,
        listReadingFiles: state => state.readingFiles,
        getReading: state => state.reading,
    },
    actions: {
        create: async (ctx, {name, title}) => {
            let m = await Axios.post("/api/v1/repos", {name, title})
            if (m.status === 200) {
                ctx.dispatch("notification/pushNotification", {
                    title: `Repo "${name}" created` ,
                    body: "Success",
                    type: "info"
                }, { root: true })
                return m.data.result
            }
            return null
        },
        getAll: async (ctx) => {
            let r = await Axios.get("/api/v1/repos")
            ctx.commit('setAll', r.data.result)
        },
        beginWs: async (ctx, {id}) => {
            await Axios.wsOpen(`/api/v1/repos/w/${id}/`)
        },
        fetchCurrent: async (ctx, repo) => {
            let r = await Axios.get(`/api/v1/repos/u/${repo.username}/${repo.repo}`)
            ctx.commit('setCurrent', r.data.result)
        },
        files: async (ctx, list) => {
            ctx.commit("setFiles", list)
        },
        getReading: async (ctx) => {
            let r = await Axios.get("/api/v1/repos/reading/last")
            ctx.commit('setReading', r.data.result)
            return r.data.result
        },
        getReadingFiles: async (ctx, {username, repo}) => {
            const url = `api/v1/repos/files/${username}/${repo}`
            let res = await Axios.get(url)
            if (res.status === 200){
                ctx.commit('setReadingFiles', res.data.result)
            }
        },
        async setReading (ctx, {username, repo}) {
            const url = `api/v1/repos/reading/${username}/${repo}`
            let res = await Axios.post(url)
            if (res.status === 200) {
                ctx.commit('setReading', res.data.result)
            }
        },
        async fetchReadings (ctx) {
            const url = `api/v1/repos/reading`
            let res = await Axios.get(url)
            if (res.status === 200) {
                ctx.commit('setReadings', res.data.result)
            }
        }
    }
}
