import axiosClient from './axiosClientSetup';
import { GET_ALL_PROMOTES, config } from '../config/config';

const API_URL = `/${config.PROMOTE_CONTROLLER}`;
class PromoteService {
    getAll() {
        return axiosClient
            .get(API_URL + '/promotes')
            .then(response => {
                if (response.Code !== GET_ALL_PROMOTES.SUCCESS) {
                    throw Error(response.Code);
                }
                return response;
            })
    }
};

export default new PromoteService();