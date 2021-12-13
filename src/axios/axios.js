import store from "../store";

const axios = require('axios');
const axiosApiInstance = axios.create();

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
    async config => {
        const value = localStorage.getItem("token")
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
    if (!(error.response)){
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
        title: "Network Error " + error,
        body: error,
        type: 'danger'
    })
    return Promise.reject(error);
});

const refreshAccessToken = async () =>{
    const value = localStorage.getItem("token")
    const keys = JSON.parse(value)
    let res = await axiosApiInstance.post("/api/auth/refresh", keys)
    if (res.status === 200) {
        localStorage.setItem("token", JSON.stringify(res.data))
        return res.data.access_token
    }
}

export const Axios = axiosApiInstance
