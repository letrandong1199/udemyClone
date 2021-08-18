import axiosClient from './axiosClientSetup';
import { GET_PUBLIC_INFO, UPDATE_PUBLIC_INFO, config } from '../config/config';

const API_URL = `/${config.PUBLIC_INFO_CONTROLLER}`;
class PublicInfoService {
    getPublicInfo() {
        return axiosClient
            .get(API_URL + '/public-info')
            .then((response) => {
                if (response.Code === GET_PUBLIC_INFO.PUBLIC_INFO_IS_NOT_EXISTS) {
                    response['resultResponse'] = '';
                    return response;
                }
                if (response.Code !== GET_PUBLIC_INFO.SUCCESS) {
                    throw Error(response.Code)
                }
                return response;
            })
    }

    postPublicInfo(data) {
        return axiosClient
            .post(API_URL + '/public-info', data)
            .then(response => {
                if (response.Code !== UPDATE_PUBLIC_INFO.SUCCESS) {
                    throw Error(response.Code)
                }
                return response;
            })
    }
};

export default new PublicInfoService();