import axiosClient from './axiosClientSetup';
import { CREATE_CATEGORY, GET_ALL_CATEGORIES, UPDATE_CATEGORY, DELETE_CATEGORY, config } from '../config/config';

const API_URL = `/${config.CATEGORY_CONTROLLER}`;
class CategoryService {
    getAll() {
        return axiosClient.get(API_URL + '/categories').then(response => {
            if (response.Code !== GET_ALL_CATEGORIES.SUCCESS) {
                throw Error(response);
            }
            return response;
        })
    }
    getOne(id) {
        return axiosClient.get(API_URL + '/categories/' + id)
    }
    deleteOne(id) {
        return axiosClient.delete(API_URL + '/categories/' + id)
            .then(response => {
                if (response.Code !== DELETE_CATEGORY.SUCCESS) {
                    throw Error(response.Code);
                }
                return response;
            })
    }
    updateOne(id, data) {
        return axiosClient.put(API_URL + '/categories/' + id, data
        ).then(response => {
            if (response.Code !== UPDATE_CATEGORY.SUCCESS) {
                throw Error(response.Code);
            }
            return response;
        })
    }
    postOne(category) {
        return axiosClient
            .post(API_URL + '/categories', category)
            .then(response => {
                if (response.Code !== CREATE_CATEGORY.SUCCESS) {
                    throw Error(response.Code);
                }
                return response;
            })
    }
    getMostEnrollmentCategories() {
        return axiosClient.get(API_URL + '/categories/most-register').then(response => {
            if (response.Code !== GET_ALL_CATEGORIES.SUCCESS) {
                throw Error(response.Code);
            }
            return response;
        })
    }
}

export default new CategoryService();