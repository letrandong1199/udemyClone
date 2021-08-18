import axiosClient from './axiosClientSetup';
import { BLOCK_USER, GET_USER, CREATE_USER, GET_ALL_USER, UPDATE_USER, CHANGE_PASSWORD, config } from '../config/config';

const API_URL = `/${config.USER_CONTROLLER}`;
class UserService {
    getAll() {
        return axiosClient
            .get(API_URL + '/users')
            .then((response) => {
                if (response.Code !== GET_ALL_USER.SUCCESS) {
                    throw Error(response.Code)
                }
                return response;
            })
    }
    updateOne(id, data) {
        return axiosClient
            .put(API_URL + '/users/' + id, data)
            .then(response => {
                if (response.Code !== UPDATE_USER.SUCCESS) {
                    throw Error(response.Code)
                }
                return response;
            })
    }
    updateInfo(data) {
        return axiosClient
            .put(API_URL + '/update-user', data)
            .then(response => {
                if (response.Code !== UPDATE_USER.SUCCESS) {
                    throw Error(response.Code)
                }
                return response;
            })
    }
    changePassword(data) {
        return axiosClient
            .put(API_URL + '/change-password', data)
            .then(response => {
                if (response.Code !== CHANGE_PASSWORD.SUCCESS) {
                    throw Error(response.Code)
                }
                return response;
            })
    }
    postOne(user) {
        return axiosClient
            .post(API_URL + '/users', user)
            .then(response => {
                if (response.Code !== CREATE_USER.SUCCESS) {
                    throw Error(response.Code)
                }
                return response
            })
    }
    updateStatus(id) {
        return axiosClient
            .put(API_URL + '/users/is-blocked/' + id)
            .then(response => {
                if (response.Code !== BLOCK_USER.SUCCESS) {
                    throw Error(response.Code)
                }
                return response;
            })
    }

    getUserBoard() {
        return axiosClient
            .get(API_URL + '/get-info')
            .then(response => {
                if (response.Code !== GET_USER.SUCCESS) {
                    throw Error(response.Code)
                }
                return response;
            })
    }

    getInstructorBoard() {
        return axiosClient.get(API_URL + '/instructor');
    }

    getAdminBoard() {
        return axiosClient.get(API_URL + '/admin');
    }

};

export default new UserService();