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
        title: 'App Title',
        modal: {
            open: false,
            width: 400,
            height: 200,
            title: "Title",
            container: ""
        },
        searchString: ''
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
        title: state => state.title,
        getModal: state => state.modal,
        getSearchString: state => state.searchString
    },
    mutations: {
        setTitle: (state, t) => state.title = t,
        setSearchString: (state, t) => state.searchString = t,
        setModal: (state, m) => state.modal = m,
        setModalState: (state, bool) => state.modal.open = bool,
        setModalDimens: (state, height, width) => {
            state.modal.height = height
            state.modal.width  = width
        },
        setModalContainer: (state, c) => state.modal.container = c
    }
})

export default store
