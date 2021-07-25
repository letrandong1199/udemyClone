import axios from 'axios';
import authHeader from './authHeader.service.js';

const API_URL = 'http://localhost:8080/api/user-controller';

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    function (error) {
        const originalRequest = error.config;
        let user = localStorage.getItem("user");
        if (user?.refreshToken && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            return axios
                .post(API_URL + '/refresh_token', { refreshToken: user.refreshToken })
                .then((res) => {
                    if (res.status === 200) {
                        user["token"] = res.data.message.accessToken
                        localStorage.setItem("accessToken", res.data.accessToken);
                        console.log("Access token refreshed!");
                        return axios(originalRequest);
                    }
                });
        }
        return Promise.reject(error);
    }
);
class UserService {
    constructor() {
        axios.interceptors.response.use(
            (response) => {
                return response;
            },
            function (error) {
                console.log("r", error);
                const originalRequest = error.config;
                let user = JSON.parse(localStorage.getItem("user"));
                if (user?.refreshToken && error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    console.log("Heh");
                    return axios
                        .post(API_URL + '/refresh-token', { refreshToken: user.refreshToken })
                        .then((res) => {
                            if (res.status === 200) {
                                user.token = res.data.message.accessToken
                                localStorage.setItem("user", JSON.stringify(user));
                                console.log("Access token refreshed!");
                                return axios(originalRequest);
                            }
                        });
                }
                return Promise.reject(error);
            }
        );
    }
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }

    getUserBoard() {
        return axios.get(API_URL + '/get-info', { headers: authHeader() });
    }

    getModeratorBoard() {
        return axios.get(API_URL + 'mod', { headers: authHeader() });
    }

    getAdminBoard() {
        return axios.get(API_URL + 'admin', { headers: authHeader() });
    }
}

export default new UserService();