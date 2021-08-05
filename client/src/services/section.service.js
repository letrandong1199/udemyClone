import axios from 'axios';
import authHeader from './authHeader.service.js';
import {
    CREATE_SECTION,
    UPDATE_SECTION,
    GET_SECTION_BY_COURSE_ID,
    DELETE_SECTION,
    config,
} from '../config/config';
const API_URL = `${config.HOST}/${config.SECTION_CONTROLLER}`;

class SectionService {
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
    getAll(id) {
        return axios.get(API_URL + '/sections', { headers: authHeader() })
    };
    getById(courseId) {
        return axios.get(API_URL + '/sections/' + courseId, { headers: authHeader() })
            .then(response => {
                if (response.data.message.Code !== GET_SECTION_BY_COURSE_ID.SUCCESS) {
                    throw Error(response.data.message.Code);
                }
                return response.data.message;
            })
    };
    postOne(data) {
        return axios
            .post(API_URL + '/sections', data, { headers: authHeader() })
            .then(response => {
                if (response.data.message.Code !== CREATE_SECTION.SUCCESS) {
                    throw Error(response.data.message.Code);
                }
                return response.data.message;
            })
    }
    updateOne(id, data) {
        return axios
            .put(API_URL + '/sections/' + id, data, { headers: authHeader() })
            .then(response => {
                if (response.data.message.Code !== UPDATE_SECTION.SUCCESS) {
                    throw Error(response.data.message.Code);
                }
                return response.data.message;
            })
    }
    deleteOne(id) {
        return axios
            .delete(API_URL + '/sections/' + id, { headers: authHeader() })
            .then(response => {
                if (response.data.message.Code !== DELETE_SECTION.SUCCESS) {
                    throw Error(response.data.message.Code);
                }
                return response.data.message;
            })
    }
}

export default new SectionService();