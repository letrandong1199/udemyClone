import axiosClient from './axiosClientSetup';
import {
    GET_LECTURE_BY_SECTION_ID,
    CREATE_LECTURE,
    UPDATE_LECTURE,
    DELETE_LECTURE,
    config,
} from '../config/config';

const API_URL = `/${config.LECTURE_CONTROLLER}`;
class LectureService {
    getById(id) {
        return axiosClient.get(API_URL + '/lectures/' + id)
            .then(response => {
                if (response.Code !== GET_LECTURE_BY_SECTION_ID.SUCCESS) {
                    throw Error(response.Code);
                }
                return response;
            })
    };
    postOne(data) {
        return axiosClient
            .post(API_URL + '/lectures', data)
            .then(response => {
                if (response.Code !== CREATE_LECTURE.SUCCESS) {
                    throw Error(response.Code);
                }
                return response;
            })
    }
    updateOne(id, data) {
        return axiosClient
            .put(API_URL + '/lectures/' + id, data)
            .then(response => {
                if (response.Code !== UPDATE_LECTURE.SUCCESS) {
                    throw new Error(response.Code);
                }
                return response;
            })
    }
    deleteOne(id) {
        return axiosClient
            .delete(API_URL + '/lectures/' + id)
            .then(response => {
                if (response.Code !== DELETE_LECTURE.SUCCESS) {
                    throw Error(response.Code);
                }
                return response;
            })
    }
}

export default new LectureService();