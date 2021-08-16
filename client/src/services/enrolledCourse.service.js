import axiosClient from './axiosClientSetup';
import { ENROLLED, config, GET_ALL_ENROLLED, UPDATE_ENROLLED } from '../config/config';

const API_URL = `/${config.ENROLLED_CONTROLLER}`;
class EnrolledCourseService {
    getAll() {
        return axiosClient.get(API_URL + '/enrolled-courses')
    };
    getById(id) {
        return axiosClient.get(API_URL + '/enrolled-courses/' + id);
    };
    postOne(data) {
        return axiosClient
            .post(API_URL + '/enrolled-courses', data)
            .then(response => {
                if (response.Code !== ENROLLED.SUCCESS) {
                    throw Error(response.Code);
                }
                return response;
            })
    }
    updateOne(data) {
        return axiosClient.put(API_URL + '/enrolled-courses', data)
            .then(response => {
                if (response.Code !== UPDATE_ENROLLED.SUCCESS) {
                    throw Error(response.Code);
                }
                return response;
            })
    }
    getEnrolledByUser() {
        return axiosClient
            .get(API_URL + '/enrolled-courses')
            .then(response => {
                if (response.Code !== GET_ALL_ENROLLED.SUCCESS) {
                    throw Error(response.Code);
                }
                return response;
            })
    }
}

export default new EnrolledCourseService();