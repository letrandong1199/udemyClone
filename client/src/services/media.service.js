import axiosClient from './axiosClientSetup';
import {
    CREATE_MEDIA,
    GET_MEDIA_BY_LECTURE_ID,
    UPDATE_MEDIA,
    DELETE_MEDIA,
    config,
} from '../config/config';
const API_URL = `/${config.MEDIA_CONTROLLER}`;

class MediaService {
    postOne(data, onUploadProgress) {
        console.log('video', data);
        return axiosClient
            .post(API_URL + '/medias', data, { onUploadProgress: onUploadProgress })
            .then(response => {
                if (response.Code !== CREATE_MEDIA.SUCCESS) {
                    throw Error(response.Code);
                }
                return response;
            })
    }
    getMediaByLectureId(lectureId) {
        return axiosClient.get(API_URL + "/medias/" + lectureId)
            .then(response => {
                if (response.Code !== GET_MEDIA_BY_LECTURE_ID.SUCCESS) {
                    throw Error(response)
                }
                return response;
            })
    }
    updateOne(id, data) {
        return axiosClient
            .put(API_URL + '/medias/' + id, data)
            .then(response => {
                if (response.Code !== UPDATE_MEDIA.SUCCESS) {
                    throw new Error(response.Code);
                }
                return response;
            })
    }
    deleteOne(id) {
        console.log('req', id);
        return axiosClient
            .delete(API_URL + '/medias/' + id)
            .then(response => {
                if (response.Code !== DELETE_MEDIA.SUCCESS) {
                    throw Error(response.Code);
                }
                return response;
            })
    }
}

export default new MediaService();