import axios from 'axios';
import authHeader from './authHeader.service.js';
import {
    CREATE_MEDIA,
    GET_MEDIA_BY_LECTURE_ID,
    UPDATE_MEDIA,
    DELETE_MEDIA
} from '../config/config';
const API_URL = 'http://localhost:8080/api/media-controller';

class MediaService {
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

    postOne(data, onUploadProgress) {
        console.log('video', data);
        return axios
            .post(API_URL + '/medias', data, { onUploadProgress: onUploadProgress, headers: authHeader() })
            .then(response => {
                console.log(response);
                if (response.data.message.Code !== CREATE_MEDIA.SUCCESS) {
                    throw Error(response.data.message.Code);
                }
                return response.data.message;
            })
    }
    getMediaByLectureId(lectureId) {
        return axios.get(API_URL + "/medias/" + lectureId, { headers: authHeader() })
            .then(response => {
                if (response.data.message.Code !== GET_MEDIA_BY_LECTURE_ID.SUCCESS) {
                    throw Error(response.data.message)
                }
                return response.data.message;
            })
    }
    updateOne(id, data) {
        return axios
            .put(API_URL + '/medias/' + id, data, { headers: authHeader() })
            .then(response => {
                console.log(response);
                if (response.data.message.Code !== UPDATE_MEDIA.SUCCESS) {
                    throw new Error(response.data.message.Code);
                }
                return response.data.message;
            })
    }
    deleteOne(id) {
        console.log('req', id);
        return axios
            .delete(API_URL + '/medias/' + id, { headers: authHeader() })
            .then(response => {
                console.log(response);
                if (response.data.message.Code !== DELETE_MEDIA.SUCCESS) {
                    throw Error(response.data.message.Code);
                }
                return response.data.message;
            })
    }
}

export default new MediaService();