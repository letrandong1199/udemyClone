import axiosClient from './axiosClientSetup';
import { DELETE_WISHLIST, GET_WISHLIST, ADD_WISHLIST, config } from '../config/config';

const API_URL = `/${config.WISHLIST_CONTROLLER}`;

class WishlistService {
    getAll() {
        return axiosClient
            .get(API_URL + '/wishlists')
            .then(response => {
                if (response.Code !== GET_WISHLIST.SUCCESS) {
                    throw Error(response.Code);
                }
                return response;
            })
    }
    postOne(data) {
        return axiosClient
            .post(API_URL + '/wishlists', data)
            .then(response => {
                if (response.Code !== ADD_WISHLIST.SUCCESS) {
                    throw Error(response.Code);
                }
                return response;
            })
    }
    deleteOne(id) {
        return axiosClient
            .delete(API_URL + '/wishlists/' + id)
            .then(response => {
                if (response.Code !== DELETE_WISHLIST.SUCCESS) {
                    throw Error(response.Code);
                }
                return response;
            })
    }
}

export default new WishlistService();