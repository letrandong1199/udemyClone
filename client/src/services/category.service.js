import axios from 'axios';
import authHeader from './authHeader.service.js';

const API_URL = 'http://localhost:8080/api/category-controller';
const API_URL_USER = 'http://localhost:8080/api/user-controller';
class CategoryService {
    constructor() {
        axios.interceptors.response.use(
            (response) => {
                console.log('Hello');
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
        return axios.get(API_URL + '/categories')
    }
    getOne(id) {
        return axios.get(API_URL + '/categories/' + id)
    }
    deleteOne(id) {
        return axios.delete(API_URL + '/categories/' + id, { headers: authHeader() })
    }
    updateOne(id, data) {
        return axios.put(API_URL + '/categories/' + id, data, { headers: authHeader() }
        )
    }
    postOne(category) {
        return axios
            .post(API_URL + '/categories', category, { headers: authHeader() })
            .then(response => {
                console.log(response);
                return response
            })
    }
}

export default new CategoryService();