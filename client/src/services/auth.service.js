import axiosClient from './axiosClientSetup';
import { CREATE_USER, SIGN_IN, config } from '../config/config';

const API_URL = `/${config.USER_CONTROLLER}`;

const ADMIN = 1;
const INSTRUCTOR = 2;

class AuthService {
    login(data) {
        return axiosClient
            .post(API_URL + '/authenticate-user', data)
            .then(response => {
                if (response.Code === SIGN_IN.WRONG_EMAIL) {
                    throw Error('email-Email not exists')
                }
                if (response.Code === SIGN_IN.WRONG_PASSWORD) {
                    throw Error('password-Wrong password')
                }
                if (response.Code === SIGN_IN.IS_BLOCKED) {
                    throw Error('email-Your account is blocked. Please contact admin.')
                }
                if (response.Code !== SIGN_IN.SUCCESS) {
                    throw Error(response.Code);
                }
                if (response.token) {
                    window.localStorage.setItem("user", JSON.stringify(response));
                }

                return response;
            });
    };

    logout() {
        console.log('object');
        let user = localStorage.getItem("user");
        if (user) {
            const refreshToken = JSON.parse(user).refreshToken;
            return axiosClient.post(API_URL + "/reject-refresh-token", {
                refreshToken: refreshToken
            }).then(response => {
                localStorage.removeItem("user");
                return response;
            });
        }
    };

    register(data) {
        return axiosClient.post(API_URL + "/sign-up", data).then(response => {
            console.log(response);
            if (response.Code === CREATE_USER.EMAIL_IS_EXIST) {
                throw Error('Email already exists')
            }
            if (response.Code !== CREATE_USER.SUCCESS) {
                throw Error(response.Code);
            };
            return response;
        })
    };

    refreshToken() {
        let user = localStorage.getItem("user")
        if (user) {
            console.log("refreshToken");
            const refreshToken = JSON.parse(user).refreshToken;
            return axiosClient.post(API_URL + "/refresh-token", {
                refreshToken: refreshToken
            }).then(response => {
                return response;
            });
        }

    };

    getCurrentUser() {
        if (localStorage.getItem('user')) {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const user_ = JSON.parse(atob(user.token.split('.')[1]));
                return {
                    email: user_.Email,
                    name: user_.Name,
                }
            } catch (error) {
                console.log(error);
            }

        }
        return undefined;
    };

    getCurrentUserId() {
        const user = JSON.parse(localStorage.getItem('user'));
        const id = JSON.parse(atob(user.token.split('.')[1])).User_Id;
        return id
    }

    isUser() {
        if (localStorage.getItem('user')) {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                return Boolean(user && user.token);
            } catch (error) {
                console.log(error);
            }

        }
        return false;
    };

    isInstructor() {
        if (localStorage.getItem('user')) {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const role = JSON.parse(atob(user.token.split('.')[1])).Role_Id;
                return Boolean(user && user.token && role === INSTRUCTOR);
            } catch (error) {
                console.log(error);
            }

        }
        return false;
    };
    isAdmin() {
        if (localStorage.getItem('user')) {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                let role = null;
                if (user && user.token) {
                    role = JSON.parse(atob(user.token.split('.')[1])).Role_Id;
                }

                return Boolean(user && user.token && role === ADMIN);
            } catch (error) {
                console.log(error);
            }

        }
        return false;
    };
}

export default new AuthService();