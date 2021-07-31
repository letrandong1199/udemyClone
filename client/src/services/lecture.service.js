import axios from 'axios';
import authHeader from './authHeader.service.js';
import { GET_LECTURE_BY_SECTION_ID, CREATE_LECTURE } from '../config/config';

const API_URL = 'http://localhost:8080/api/lecture-controller';

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

                        })
                }
                return Promise.reject(error);
            }
        );
    };
    getAll() {
        console.log("Cal service");
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
                console.log(response);
                if (response.data.message.Code !== CREATE_LECTURE.SUCCESS) {
                    throw Error(response.data.message.Code);
                }
                return response.data.message;
            })
    }
    updateOne(data) {
        return axios
            .put(API_URL + '/lectures', data, { headers: authHeader() })
            .then(response => {
                console.log(response);
                return response
            })
    }
}

export default new LectureService();