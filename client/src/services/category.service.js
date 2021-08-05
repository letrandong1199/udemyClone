import axios from 'axios';
import authHeader from './authHeader.service.js';
import { GET_ALL_CATEGORIES, UPDATE_CATEGORY, DELETE_CATEGORY, config } from '../config/config';

const API_URL = `${config.HOST}/${config.CATEGORY_CONTROLLER}`;
const API_URL_USER = `${config.HOST}/${config.USER_CONTROLLER}`;
class CategoryService {
    constructor() {
        axios.interceptors.response.use(
            (response) => {
                return response;
            },
            function (error) {
                const originalRequest = error.config;
                console.log('Refresh');
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
                        });
                }
                return Promise.reject(error);
            }
        );
    };
    getAll() {
        return axios.get(API_URL + '/categories').then(response => {
            if (response.data.message.Code !== GET_ALL_CATEGORIES.SUCCESS) {
                throw Error(response.data.message);
            }
            return response.data.message;
        })
    }
    getOne(id) {
        return axios.get(API_URL + '/categories/' + id)
    }
    deleteOne(id) {
        return axios.delete(API_URL + '/categories/' + id, { headers: authHeader() })
            .then(response => {
                if (response.data.message.Code !== DELETE_CATEGORY.SUCCESS) {
                    throw Error(response.data.message.Code);
                }
                return response.data.message;
            })
    }
    updateOne(id, data) {
        return axios.put(API_URL + '/categories/' + id, data, { headers: authHeader() }
        ).then(response => {
            if (response.data.message.Code !== UPDATE_CATEGORY.SUCCESS) {
                throw Error(response.data.message.Code);
            }
            return response.data.message;
        })
    }
    postOne(category) {
        console.log('as', category);
        return axios
            .post(API_URL + '/categories', category, { headers: authHeader() })
            .then(response => {
                return response
            })
    }
    getMostEnrollmentCategories() {
        return axios.get(API_URL + '/categories/most-register').then(response => {
            if (response.data.message.Code !== GET_ALL_CATEGORIES.SUCCESS) {
                throw Error(response.data.message.Code);
            }
            return response.data.message;
        })
    }
}

export default new CategoryService();