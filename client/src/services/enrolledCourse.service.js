import axios from 'axios';
import authHeader from './authHeader.service.js';
import { ENROLLED, config, GET_ALL_ENROLLED, UPDATE_ENROLLED } from '../config/config';

const API_URL = `${config.HOST}/${config.ENROLLED_CONTROLLER}`;
const API_URL_USER = `${config.HOST}/${config.USER_CONTROLLER}`;
class EnrolledCourseService {
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
    getAll() {
        return axios.get(API_URL + '/enrolled-courses', { headers: authHeader() })
    };
    getById(id) {
        return axios.get(API_URL + '/enrolled-courses/' + id);
    };
    postOne(data) {
        return axios
            .post(API_URL + '/enrolled-courses', data, { headers: authHeader() })
            .then(response => {
                if (response.data.message.Code !== ENROLLED.SUCCESS) {
                    throw Error(response.data.message.Code);
                }
                return response.data.message;
            })
    }
    updateOne(data) {
        return axios.put(API_URL + '/enrolled-courses', data, { headers: authHeader() })
            .then(response => {
                if (response.data.message.Code !== UPDATE_ENROLLED.SUCCESS) {
                    throw Error(response.data.message.Code);
                }
                return response.data.message;
            })
    }
    getEnrolledByUser() {
        return axios
            .get(API_URL + '/enrolled-courses', { headers: authHeader() })
            .then(response => {
                if (response.data.message.Code !== GET_ALL_ENROLLED.SUCCESS) {
                    throw Error(response.data.message.Code);
                }
                return response.data.message;
            })
    }
}

export default new EnrolledCourseService();