
export default {
    state: {
        theme: "light",
        menuState: true,
        fixedMenu: true,
    },
    mutations: {
        setTheme: (state, data) => {
            state.theme = data;
            localStorage.setItem("theme", data)
        },
        toggleMenu: state => state.menuState = !state.menuState,
        setFixedMenu: (state, data) => {
            state.fixedMenu = data
            if (!data) {
                state.menuState = false
            }
            localStorage.setItem("isMenuFixed", data)
        }
    },
    getters: {
        getTheme: state => state.theme,
        getMenuState: state => state.menuState,
        isMenuFixed: state => state.fixedMenu
    },
    actions: {
        loadTheme: (ctx) => {
            let theme = localStorage.getItem("theme")
            ctx.commit("setTheme", theme)
        },
        loadMenuFixed(ctx){
            const bool = localStorage.getItem("isMenuFixed") === "true"
            ctx.commit("setFixedMenu", bool)
        },
        saveTheme: (ctx) => {
            localStorage.setItem("theme", ctx.getters.theme)
        }
    }
}
