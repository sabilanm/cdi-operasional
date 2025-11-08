import axios from "axios";
import Cookies from "js-cookie";

const apiJSON = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
const apiForm = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

// interceptor untuk menambahkan token otomatis
const addAuthInterceptor = (instance) => {
    instance.interceptors.request.use(
        (config) => {
            const token =
                Cookies.get(process.env.REACT_APP_TOKEN) ||
                Cookies.get("operasional_token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );
};

// Tambahkan interceptor ke dua instance
addAuthInterceptor(apiJSON);
addAuthInterceptor(apiForm);

// Export dua-duanya
export { apiJSON, apiForm };
