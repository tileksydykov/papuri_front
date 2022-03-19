import axios from "axios";
import {Axios} from "@/axios/axios";

export default {
    state: {
        user: null,
        loggedIn: false,
        registered: false,
    },
    mutations: {
        setLoggedIn: (state, data) => state.loggedIn = data,
        setRegistered: (state, data) => state.registered = data,
        setUser: (state, data) => state.user = data,
    },
    getters: {
        getLoggedIn: state => state.loggedIn,
        getUser: state => state.user
    },
    actions: {
        logout: async (ctx) => {
            localStorage.setItem("token", '{}')
            ctx.commit("setLoggedIn", false)
            ctx.commit("setUser", null)
        },
        login: async (ctx, {email, password}) => {
            const res = await axios.post("/api/auth/login", {user_name: email, password})
            if(res.status === 200){
                localStorage.setItem("token", JSON.stringify(res.data))
                ctx.dispatch("fetchUser")
                return res.data
            }
        },
        register: async ({dispatch}, {email, password, name, surname}) => {
            let config = {
                headers: { 'content-type': 'application/x-www-form-urlencoded' }
            }
            const params = new URLSearchParams();
            params.append('user_name', email);
            params.append('password', password);
            params.append('first_name', name);
            params.append('last_name', surname);
            const res = await axios.post("/api/auth/register", params, config)
            if (res.status === 200){
                localStorage.setItem("token", JSON.stringify(res.data))
                dispatch("fetchUser")
                return res.data
            } else {
                dispatch(
                    "notification/pushNotification", {
                        title: res.data.message,
                        body: "error",
                        type: 'danger'
                    }
                )
            }

        },
        fetchUser: async ({commit}) => {
            const res = await Axios.get("api/v1/user/me")
            if (res.status === 200) {
                commit("setUser", res.data)
                commit("setLoggedIn", true)
            } else {
                commit("setLoggedIn", false)
            }
        },
        checkLogin: async ({commit, dispatch}) => {
            const logInData = JSON.parse(localStorage.getItem("token"))
            let logged = (logInData) && logInData.access_token
            commit("setLoggedIn", logged)
            if (logged) {
                dispatch("fetchUser")
            }
        }
    }
}
