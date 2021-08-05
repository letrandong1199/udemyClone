import axios from 'axios';
import authHeader from './authHeader.service.js';
import {
    GET_LECTURE_BY_SECTION_ID,
    CREATE_LECTURE,
    UPDATE_LECTURE,
    DELETE_LECTURE,
    config,
} from '../config/config';

const API_URL = `${config.HOST}/${config.LECTURE_CONTROLLER}`;

class LectureService {
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
                        .post(API_URL + '/refresh-token', { refreshToken: user.refreshToken })
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
    getAll() {
        return axios.get(API_URL + '/lectures', { headers: authHeader() })
    };
    getById(id) {
        return axios.get(API_URL + '/lectures/' + id, { headers: authHeader() })
            .then(response => {
                if (response.data.message.Code !== GET_LECTURE_BY_SECTION_ID.SUCCESS) {
                    throw Error(response.data.message.Code);
                }
                return response.data.message;
            })
    };
    postOne(data) {
        return axios
            .post(API_URL + '/lectures', data, { headers: authHeader() })
            .then(response => {
                if (response.data.message.Code !== CREATE_LECTURE.SUCCESS) {
                    throw Error(response.data.message.Code);
                }
                return response.data.message;
            })
    }
    updateOne(id, data) {
        return axios
            .put(API_URL + '/lectures/' + id, data, { headers: authHeader() })
            .then(response => {
                if (response.data.message.Code !== UPDATE_LECTURE.SUCCESS) {
                    throw new Error(response.data.message.Code);
                }
                return response.data.message;
            })
    }
    deleteOne(id, data) {
        return axios
            .delete(API_URL + '/lectures/' + id, { headers: authHeader() })
            .then(response => {
                if (response.data.message.Code !== DELETE_LECTURE.SUCCESS) {
                    throw Error(response.data.message.Code);
                }
                return response.data.message;
            })
    }
}

export default new LectureService();