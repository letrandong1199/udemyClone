import axios from 'axios';
import authHeader from './authHeader.service.js';
import { UPDATE_USER, CHANGE_PASSWORD } from '../config/config';

const API_URL = 'http://localhost:8080/api/user-controller';
class UserService {
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
                        });
                }
                return Promise.reject(error);
            }
        );
    };
    getAll() {
        return axios.get(API_URL + '/users', { headers: authHeader() })
    }
    deleteOne(id) {
        return axios.delete(API_URL + '/users/' + id, { headers: authHeader() })
    }
    updateOne(id, data) {
        return axios.put(API_URL + '/users/' + id, data, { headers: authHeader() }
        )
    }
    updateInfo(data) {
        return axios.put(API_URL + '/update-user', data, { headers: authHeader() })
            .then(response => {
                console.log(response);
                if (response.data.message.Code !== UPDATE_USER.SUCCESS) {
                    throw Error(response.data.message.Code)
                }
                return response.data.message;
            })
    }
    changePassword(data) {
        return axios.put(API_URL + '/change-password', data, { headers: authHeader() })
            .then(response => {
                console.log(response);
                if (response.data.message.Code !== CHANGE_PASSWORD.SUCCESS) {
                    throw Error(response.data.message.Code)
                }
                return response.data.message;
            })
    }
    postOne(user) {
        return axios
            .post(API_URL + '/users', user, { headers: authHeader() })
            .then(response => {
                console.log(response);
                return response
            })
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