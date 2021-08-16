import {
    GET_ONE_MEDIA_USER,
    CREATE_MEDIA_USER,
    config,
} from '../config/config';
import axiosClient from './axiosClientSetup';
const API_URL = `/${config.MEDIA_USER_CONTROLLER}`;

class MediaUserService {
    postOne(data) {
        return axiosClient
            .post(API_URL + '/media-user', data)
            .then(response => {
                if (response.Code !== CREATE_MEDIA_USER.SUCCESS) {
                    throw Error(response.Code);
                }
                return response;
            })
    }
    getOne(id) {
        return axiosClient
            .get(API_URL + "/media-user/" + id)
            .then(response => {
                if (response.Code !== GET_ONE_MEDIA_USER.SUCCESS) {
                    throw Error(response.Code)
                }
                return response;
            })
    }
}

export default new MediaUserService();