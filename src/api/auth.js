import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// interceptor untuk menambahkan token otomatis
api.interceptors.request.use(
    (config) => {
        const token = Cookies.get(process.env.REACT_APP_TOKEN) || Cookies.get("operasional_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

export default api;
