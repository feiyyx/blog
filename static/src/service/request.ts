import axios from 'axios';
const baseURL = '/api';
const SUCCESS_CODE = 0;
const instance = axios.create({
    baseURL,
    timeout: 60 * 1000,
    headers: {
        'Content-Type': 'application/json',
    }
});

instance.interceptors.request.use(config => {
    return config;
}, error => {
    return Promise.reject(error);
});

instance.interceptors.response.use(response => {
    if (response.data.code !== SUCCESS_CODE) {
        return Promise.reject(response.data);
    }
    return response.data.data;
}, error => {
    return Promise.reject(error);
})

export default instance;