import axios from 'axios';

const API_URL = 'http://localhost:8080/api/language-controller';
class LanguageService {
    getAll() {
        return axios.get(API_URL + '/languages')
    }
}

export default new LanguageService();