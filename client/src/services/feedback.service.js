import axiosClient from './axiosClientSetup';
import { CREATE_FEEDBACK, config, UPDATE_FEEDBACK } from '../config/config';

const API_URL = `/${config.FEEDBACK_CONTROLLER}`;
class FeedbackService {
    postOne(data) {
        return axiosClient
            .post(API_URL + '/feedbacks', data)
            .then(response => {
                if (response.Code !== CREATE_FEEDBACK.SUCCESS) {
                    throw Error(response.Code);
                }
                return response;
            })
    }
    updateOne(id, data) {
        return axiosClient.put(API_URL + '/feedbacks/' + id, data)
            .then(response => {
                if (response.Code !== UPDATE_FEEDBACK.SUCCESS) {
                    throw Error(response.Code);
                }
                return response;
            })
    }

}

export default new FeedbackService();