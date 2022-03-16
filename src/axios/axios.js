import store from "../store";

const axios = require('axios');
const axiosApiInstance = axios.create({
    baseURL: "/"
});

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
    async config => {
        const value = getToken()
        const keys = JSON.parse(value)
        if (keys && keys.access_token) {
            config.headers = {
                'Authorization': `Bearer ${keys.access_token}`,
                'Accept': 'application/json',
            }
        }
        return config;
    },
    error => {
        Promise.reject(error)
    });

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use((response) => {
    return response
}, async function (error) {
    if (!(error.response)) {
        return  Promise.reject(error)
    }
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const access_token = await refreshAccessToken();
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
        return axiosApiInstance(originalRequest);
    } else if (error.response.status === 400 && error.response.config.url === '/api/auth/refresh') {
        await store.dispatch("logout")
    }
    await store.dispatch("notification/pushNotification", {
        title: error.response.data.error,
        body: error.response.data.error,
        type: 'danger'
    })
    return Promise.reject(error);
});

const refreshAccessToken = async () =>{
    const value = getToken()
    const keys = JSON.parse(value)
    let res = await axiosApiInstance.post("/api/auth/refresh", keys)
    if (res.status === 200) {
        localStorage.setItem("token", JSON.stringify(res.data))
        return res.data.access_token
    }
}

const getToken = () => {
    return localStorage.getItem("token")
}

axiosApiInstance.wsOpen = (wsUrl) => {
    axiosApiInstance.ws && axiosApiInstance.ws.close(true)
    let wsOrigin = window.location.origin
    wsOrigin = wsOrigin.replace("http://", "ws://")
    wsOrigin = wsOrigin.replace("https://", "wss://")
    axiosApiInstance.ws = new WebSocket(wsOrigin + wsUrl)
    axiosApiInstance.ws.onmessage = (message) => {
        let m = JSON.parse(message.data)
        store.dispatch("repos/" + m.type, m.data)
    }
    let accessToken = JSON.parse(getToken()).access_token
    axiosApiInstance.ws.onopen = () => {
        axiosApiInstance.ws.send(JSON.stringify({type: "auth", data: accessToken}))
    }
}

axiosApiInstance.generateMediaLink = (id) => {
    return "api/v1/md/"+id
}

export const Axios = axiosApiInstance
