import axiosClient from './axiosClientSetup';
import { GET_ALL_LANGUAGES, config } from '../config/config';

const API_URL = `/${config.LANGUAGE_CONTROLLER}`;
class LanguageService {
    getAll() {
        return axiosClient.get(API_URL + '/languages').then(response => {
            if (response.Code !== GET_ALL_LANGUAGES.SUCCESS) {
                throw Error(response.Code);
            }
            return response;
        })
    }
}

export default new LanguageService();