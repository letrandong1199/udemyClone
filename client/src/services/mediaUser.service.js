import axios from 'axios';
import authHeader from './authHeader.service.js';
import {
    GET_ONE_MEDIA_USER,
    CREATE_MEDIA_USER,
    config,
} from '../config/config';
const API_URL = `${config.HOST}/${config.MEDIA_USER_CONTROLLER}`;
const API_URL_USER = `${config.HOST}/${config.USER_CONTROLLER}`;

class MediaUserService {
    constructor() {
        axios.interceptors.response.use(
            (response) => {
                return response;
            },
            function (error) {
                const originalRequest = error.config;
                let user = JSON.parse(localStorage.getItem("user"));
                if (user?.refreshToken && error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    return axios
                        .post(API_URL_USER + '/refresh-token', { refreshToken: user.refreshToken })
                        .then((res) => {
                            if (res.status === 200) {
                                user = res.data.message
                                localStorage.setItem("user", JSON.stringify(user));
                                console.log("Access token refreshed!");
                                originalRequest.headers = authHeader();
                                return axios(originalRequest);
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        })
                }
                return Promise.reject(error);
            }
        );
    };

    postOne(data) {
        return axios
            .post(API_URL + '/media-user', data, { headers: authHeader() })
            .then(response => {
                if (response.data.message.Code !== CREATE_MEDIA_USER.SUCCESS) {
                    throw Error(response.data.message.Code);
                }
                return response.data.message;
            })
    }
    getOne(id) {
        return axios.get(API_URL + "/media-user/" + id, { headers: authHeader() })
            .then(response => {
                if (response.data.message.Code !== GET_ONE_MEDIA_USER.SUCCESS) {
                    throw Error(response.data.message)
                }
                return response.data.message;
            })
    }
}

export default new MediaUserService();