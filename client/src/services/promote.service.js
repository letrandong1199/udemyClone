import axios from 'axios';
import authHeader from './authHeader.service.js';
import { GET_ALL_PROMOTES, config } from '../config/config';

const API_URL = `${config.HOST}/${config.PROMOTE_CONTROLLER}`;
class PromoteService {
    getAll() {
        return axios.get(API_URL + '/promotes', { headers: authHeader() }).then(response => {
            if (response.data.message.Code !== GET_ALL_PROMOTES.SUCCESS) {
                throw Error(response.data.message.Code);
            }
            return response.data.message;
        })
    }
}

export default new PromoteService();