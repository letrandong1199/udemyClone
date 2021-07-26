import axios from 'axios';
import authHeader from './authHeader.service.js';

const API_URL = 'http://localhost:8080/api/category-controller';
class CategoryService {
    getAll() {
        return axios.get(API_URL + '/categories')
    }
}

export default new CategoryService();