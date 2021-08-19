import axios from 'axios';
import { config } from '../config/config';
import authHeader from './authHeader';

const API_URL = `${config.HOST}/${config.USER_CONTROLLER}`;

const axiosClient = axios.create({
    baseURL: config.HOST,
    headers: {
        'Content-Type': 'application/json',
    }
});

axiosClient.interceptors.request.use(function (config) {
    config.headers = { ...config.headers, ...authHeader(), };
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

axiosClient.interceptors.response.use(
    (response) => {
        return response.data.message;
    },
    function (error) {
        const originalRequest = error.config;
        console.log('Refresh');
        let user = JSON.parse(localStorage.getItem("user"));
        if (user?.refreshToken && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            return axios
                .post(`${API_URL}/refresh-token`, { refreshToken: user.refreshToken })
                .then((res) => {
                    if (res.status === 200) {
                        user = res.data.message;
                        localStorage.setItem("user", JSON.stringify(user));
                        console.log("Access token refreshed!");
                        originalRequest.headers = authHeader();
                        return axiosClient(originalRequest);
                    }
                });
        }
        return Promise.reject(error);
    }
);

export default axiosClient;