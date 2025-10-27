import axios from 'axios';

const getApiBaseUrl = () => {
    const eveurl = (import.meta as any) .env?.VITE_API_BASE_URL;
    const localUrl = localStorage.getItem('apiBaseUrl');
    if (localUrl) {
        return localUrl;
    }
    if (eveurl) {
        return eveurl;
    }
    return 'http://127.0.0.1:8000';
}

const url = getApiBaseUrl();

export const apiBaseUrl = url;

const api = axios.create({
    baseURL: url,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers = config.headers || {};
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}));

api.interceptors.response.use((response => response), (error => {
    if (error.response && error.response.status === 401) {
        if (error.code === 'ERR_CANCELED') {
            return Promise.reject(error);
        }
        window.location.href = '/login';
    }
    return Promise.reject(error);
}));

export default api;