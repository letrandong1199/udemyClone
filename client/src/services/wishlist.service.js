import axios from 'axios';
import authHeader from './authHeader.service.js';

const API_URL = 'http://localhost:8080/api/wishlist-controller';

class WishlistService {
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
        return axios.get(API_URL + '/wishlists', { headers: authHeader() })
    };
    getById(id) {
        return axios.get(API_URL + '/wishlists/' + id);
    };
    postOne(data) {
        return axios
            .post(API_URL + '/wishlists', data, { headers: authHeader() })
            .then(response => {
                return response
            })
    }
    deleteOne(id) {
        return axios.delete(API_URL + '/wishlists/' + id, { headers: authHeader() })
    }
}

export default new WishlistService();