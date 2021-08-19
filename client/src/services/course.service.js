import axiosClient from './axiosClientSetup';
import {
    BLOCK_COURSE,
    GET_ONE_COURSE,
    UPDATE_COURSE,
    GET_ALL_COURSE,
    CREATE_COURSE,
    config
} from '../config/config';

const API_URL = `/${config.COURSE_CONTROLLER}`;

class CourseService {
    getAll() {
        return axiosClient.get(API_URL + '/courses/manage').then(response => {
            if (response.Code !== GET_ALL_COURSE.SUCCESS) {
                throw Error(response.Code);
            }
            return response;
        })
    }
    getById(id) {
        return axiosClient.get(API_URL + '/courses/' + id).then(response => {
            if (response.Code !== GET_ONE_COURSE.SUCCESS) {
                throw Error(response.Code);
            }
            return response;
        })
    };
    postOne(course) {
        return axiosClient
            .post(API_URL + '/courses', course)
            .then(response => {
                if (response.Code !== CREATE_COURSE.SUCCESS) {
                    throw Error(response.Code);
                }
                return response;
            })
    }
    deleteOne(id) {
        return axiosClient.delete(API_URL + '/courses/' + id)
    }
    getByQuery(query) {
        return axiosClient.get(API_URL + '/courses?' + query).then(response => {
            if (response.Code !== GET_ALL_COURSE.SUCCESS) {
                throw Error(response.Code);
            }
            return response;
        })
    }
    getContentByCourseId(courseId) {
        return axiosClient.get(API_URL + '/my-learning/' + courseId)
            .then(response => {
                if (response.Code !== GET_ONE_COURSE.SUCCESS) {
                    throw Error(response.Code)
                }
                return response;
            })
    }
    updateOne(id, data) {
        return axiosClient.put(API_URL + '/courses/' + id, data)
            .then(response => {
                if (response.Code !== UPDATE_COURSE.SUCCESS) {
                    throw Error(response.Code);
                }
                return response;
            })
    }
    getCoursesOfInstructor() {
        return axiosClient.get(API_URL + '/my-courses').then(response => {
            if (response.Code !== GET_ALL_COURSE.SUCCESS) {
                throw Error(response.Code);
            }

            return response;
        })
    }

    getOneCourseOfInstructor(id) {
        return axiosClient.get(API_URL + '/my-courses/' + id).then(response => {
            if (response.Code !== GET_ONE_COURSE.SUCCESS) {
                throw Error(response.Code);
            }

            return response;
        })
    }
    getMostViewedCourses() {
        return axiosClient.get(API_URL + '/courses/most-view').then(response => {
            if (response.Code !== GET_ALL_COURSE.SUCCESS) {
                throw Error(response.Code);
            }
            return response;
        })
    }
    getMostEnrollmentCourses() {
        return axiosClient.get(API_URL + '/courses/most-register').then(response => {
            if (response.Code !== GET_ALL_COURSE.SUCCESS) {
                throw Error(response.Code);
            }
            return response;
        })
    }
    getMostRecentCourses() {
        return axiosClient.get(API_URL + '/courses/most-recent').then(response => {
            if (response.Code !== GET_ALL_COURSE.SUCCESS) {
                throw Error(response.Code);
            }
            return response;
        })
    }
    updateStatus(id) {
        return axiosClient
            .put(API_URL + '/courses/is-blocked/' + id)
            .then(response => {
                if (response.Code !== BLOCK_COURSE.SUCCESS) {
                    throw Error(response.Code)
                }
                return response;
            })
    }
}

export default new CourseService();