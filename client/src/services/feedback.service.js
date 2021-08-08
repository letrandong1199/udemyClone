import axios from 'axios';
import authHeader from './authHeader.service.js';
import { CREATE_FEEDBACK, config, UPDATE_FEEDBACK } from '../config/config';

const API_URL = `${config.HOST}/${config.FEEDBACK_CONTROLLER}`;
const API_URL_USER = `${config.HOST}/${config.USER_CONTROLLER}`;
class FeedbackService {
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
            .post(API_URL + '/feedbacks', data, { headers: authHeader() })
            .then(response => {
                if (response.data.message.Code !== CREATE_FEEDBACK.SUCCESS) {
                    throw Error(response.data.message.Code);
                }
                return response.data.message;
            })
    }
    updateOne(id, data) {
        return axios.put(API_URL + '/feedbacks/' + id, data, { headers: authHeader() })
            .then(response => {
                if (response.data.message.Code !== UPDATE_FEEDBACK.SUCCESS) {
                    throw Error(response.data.message.Code);
                }
                return response.data.message;
            })
    }

}

export default new FeedbackService();