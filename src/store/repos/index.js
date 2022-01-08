import {Axios} from "../../axios/axios";

export default {
    namespaced: true,
    state: {
        current: {},
        all: []
    },
    mutations: {
        setCurrent: (state, data) => state.current = data,
        setAll: (state, data) => state.all = data,
    },
    getters: {
        getCurrent: state => state.current,
        listAll: state => state.all,
    },
    actions: {
        create: async (ctx, {name}) => {
            await Axios.post("/api/v1/repos", {name})
        },
        getAll: async (ctx) => {
            let r = await Axios.get("/api/v1/repos")
            ctx.commit('setAll', r.data.result)
        },
    }
}
