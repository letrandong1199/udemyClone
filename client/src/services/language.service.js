import axios from 'axios';
import { GET_ALL_LANGUAGES, config } from '../config/config';

const API_URL = `${config.HOST}/${config.LANGUAGE_CONTROLLER}`;
class LanguageService {
    getAll() {
        return axios.get(API_URL + '/languages').then(response => {
            if (response.data.message.Code !== GET_ALL_LANGUAGES.SUCCESS) {
                throw Error(response.data.message);
            }
            return response.data.message;
        })
    }
}

export default new LanguageService();