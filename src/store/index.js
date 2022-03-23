import {createStore} from "vuex";
import auth from "./auth"
import style from "./style"
import repos from "./repos"
import repo from "./repo"
import chapters from "./chapters"
import media from "./media"
import notification from "./notification"

const store = createStore({
    state: {
        title: 'App Title'
    },
    modules: {
        auth,
        style,
        repos,
        repo,
        chapters,
        media,
        notification,
    },
    actions: {
        appMounted: async (ctx) => {
            await ctx.dispatch("fetchUser")
            await ctx.dispatch("loadTheme")
            await ctx.dispatch("checkLogin")
            await ctx.dispatch("loadMenuFixed")
        }
    },
    getters: {
        title: state => state.title
    },
    mutations: {
        setTitle: (state, t) => state.title = t
    }
})

export default store
