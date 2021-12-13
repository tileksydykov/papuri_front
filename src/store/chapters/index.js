import {Axios} from "../../axios/axios";

export default {
    namespaced: true,
    state: {
        current: {},
        currentComments: []
    },
    mutations: {
        setCurrentChapter: (state, data) => state.current = data,
        setCurrentComments: (state, data) => state.currentComments = data,
    },
    getters: {
        getCurrentChapter: state => state.current,
        getCurrentComments: state => state.currentComments,
    },
    actions: {
        fetchChapter: async (ctx, {id}) => {
            let res = await Axios.get("/api/v1/chapter/" + id)
            ctx.commit("setCurrentChapter", res.data)
        },
        fetchComments: async (ctx, {id}) => {
            let res = await Axios.get("/api/v1/chapter/" + id + "/comment")
            ctx.commit("setCurrentComments", res.data)
        },
        publishComment: async (ctx, {id, comment}) => {
            const res = await Axios.post("/api/v1/chapter/" + id + "/comment", comment)
            ctx.dispatch("fetchComments", {id})
            return res.status === 200
        }
    }
}
