import axiosClient from './axiosClientSetup';
import {
    CREATE_SECTION,
    UPDATE_SECTION,
    GET_SECTION_BY_COURSE_ID,
    DELETE_SECTION,
    config,
} from '../config/config';
const API_URL = `/${config.SECTION_CONTROLLER}`;
class SectionService {
    getById(courseId) {
        return axiosClient.get(API_URL + '/sections/' + courseId)
            .then(response => {
                if (response.Code !== GET_SECTION_BY_COURSE_ID.SUCCESS) {
                    throw Error(response.Code);
                }
                return response;
            })
    };
    postOne(data) {
        return axiosClient
            .post(API_URL + '/sections', data)
            .then(response => {
                if (response.Code !== CREATE_SECTION.SUCCESS) {
                    throw Error(response.Code);
                }
                return response;
            })
    }
    updateOne(id, data) {
        return axiosClient
            .put(API_URL + '/sections/' + id, data)
            .then(response => {
                if (response.Code !== UPDATE_SECTION.SUCCESS) {
                    throw Error(response.Code);
                }
                return response;
            })
    }
    deleteOne(id) {
        return axiosClient
            .delete(API_URL + '/sections/' + id)
            .then(response => {
                if (response.Code !== DELETE_SECTION.SUCCESS) {
                    throw Error(response.Code);
                }
                return response;
            })
    }
};

export default new SectionService();