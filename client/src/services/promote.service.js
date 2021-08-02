import axios from 'axios';
import authHeader from './authHeader.service.js';

const API_URL = 'http://localhost:8080/api/promote-controller';
class PromoteService {
    getAll() {
        return axios.get(API_URL + '/promotes', { headers: authHeader() })
    }
}

export default new PromoteService();