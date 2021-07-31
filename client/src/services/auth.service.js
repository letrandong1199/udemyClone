import axios from "axios";
import { SIGN_IN } from '../config/config';

const API_URL = "http://localhost:8080/api/user-controller/";
const USER = 3;
const ADMIN = 1;
const INSTRUCTOR = 1;

class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + "authenticate-user", {
                Email: username,
                Password: password,
            })
            .then(response => {
                console.log(response);
                if (response.data.message.token) {
                    window.localStorage.setItem("user", JSON.stringify(response.data.message));
                }
                if (response.data.message.Code !== SIGN_IN.SUCCESS) {
                    throw Error(response.data.message.Code);
                }
                console.log('Successfully');

                return response.data.message;
            });
    };

    logout() {
        localStorage.removeItem("user");
    };

    register(username, name, password) {
        return axios.post(API_URL + "sign-up", {
            Email: username,
            Name: name,
            Password: password,
        });
    };

    refreshToken() {
        let user = localStorage.getItem("user")
        console.log("refreshToken");
        return axios.post(API_URL + "refresh-token", {
            refreshToken: user.refreshToken
        }).then(response => {
            console.log(response);

            return response.data.message;
        });
    };

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    };

    getCurrentUserId() {
        const user = JSON.parse(localStorage.getItem('user'));
        const id = JSON.parse(atob(user.token.split('.')[1])).User_Id;
        return id
    }

    isUser() {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log(user);
        return Boolean(user && user.token);
    };

    isInstructor() {
        const user = JSON.parse(localStorage.getItem('user'));
        const role = JSON.parse(atob(user.token.split('.')[1])).Role_Id;
        return Boolean(user && user.token && role === INSTRUCTOR);
    };
    isAdmin() {
        const user = JSON.parse(localStorage.getItem('user'));
        let role = null;
        if (user && user.token) {
            role = JSON.parse(atob(user.token.split('.')[1])).Role_Id;
        }

        return Boolean(user && user.token && role === ADMIN);
    };
}

export default new AuthService();