import axios from 'axios';
import authHeader from './authHeader.service.js';
import { GET_ONE_COURSE, UPDATE_COURSE, GET_ALL_COURSE, CREATE_COURSE, config } from '../config/config';

const API_URL = `${config.HOST}/${config.COURSE_CONTROLLER}`;
const API_URL_USER = `${config.HOST}/${config.USER_CONTROLLER}`;

class CourseService {
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
        return axios.get(API_URL + '/courses')
    };
    getById(id) {
        return axios.get(API_URL + '/courses/' + id).then(response => {
            if (response.data.message.Code !== GET_ONE_COURSE.SUCCESS) {
                throw Error(response.data.message.Code);
            }
            return response.data.message;
        })
    };
    postOne(course) {
        return axios
            .post(API_URL + '/courses', course, { headers: authHeader() })
            .then(response => {
                if (response.data.message.Code !== CREATE_COURSE.SUCCESS) {
                    throw Error(response.data.message.Code);
                }
                return response.data.message;
            })
    }
    deleteOne(id) {
        return axios.delete(API_URL + '/courses/' + id, { headers: authHeader() })
    }
    getByQuery(query) {
        return axios.get(API_URL + '/courses?' + query).then(response => {
            if (response.data.message.Code !== GET_ALL_COURSE.SUCCESS) {
                throw Error(response.data.message.Code);
            }
            return response.data.message;
        })
    }
    getContentByCourseId(courseId) {
        return axios.get(API_URL + '/my-learning/' + courseId, { headers: authHeader() })
            .then(response => {
                if (response.data.message.Code !== GET_ONE_COURSE.SUCCESS) {
                    throw Error(response.data.message.Code)
                }
                return response.data.message;
            })
    }
    updateOne(id, data) {
        return axios.put(API_URL + '/courses/' + id, data, { headers: authHeader() })
            .then(response => {
                if (response.data.message.Code !== UPDATE_COURSE.SUCCESS) {
                    throw Error(response.data.message.Code);
                }
                return response.data.message;
            })
    }
    getCoursesOfInstructor() {
        return axios.get(API_URL + '/my-courses', { headers: authHeader() }).then(response => {
            if (response.data.message.Code !== GET_ALL_COURSE.SUCCESS) {
                throw Error(response.data.message.Code);
            }

            return response.data.message;
        })
    }

    getOneCourseOfInstructor(id) {
        return axios.get(API_URL + '/my-courses/' + id, { headers: authHeader() }).then(response => {
            if (response.data.message.Code !== GET_ONE_COURSE.SUCCESS) {
                throw Error(response.data.message.Code);
            }

            return response.data.message;
        })
    }
    getMostViewedCourses() {
        return axios.get(API_URL + '/courses/most-view').then(response => {
            if (response.data.message.Code !== GET_ALL_COURSE.SUCCESS) {
                throw Error(response.data.message.Code);
            }
            return response.data.message;
        })
    }
    getMostEnrollmentCourses() {
        return axios.get(API_URL + '/courses/most-register').then(response => {
            if (response.data.message.Code !== GET_ALL_COURSE.SUCCESS) {
                throw Error(response.data.message.Code);
            }
            return response.data.message;
        })
    }
    getMostRecentCourses() {
        return axios.get(API_URL + '/courses/most-recent').then(response => {
            if (response.data.message.Code !== GET_ALL_COURSE.SUCCESS) {
                throw Error(response.data.message.Code);
            }
            return response.data.message;
        })
    }
}

export default new CourseService();