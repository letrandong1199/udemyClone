import axios from "axios";

const API_URL = "http://localhost:8080/api/user-controller/";

class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + "authenticate-user", {
                email: username,
                password
            })
            .then(response => {
                console.log(response);
                if (response.data.message.token) {
                    window.localStorage.setItem("user", JSON.stringify(response.data.message));
                }

                return response.data.message;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, name, password) {
        return axios.post(API_URL + "user", {
            email: username,
            name,
            password
        });
    }
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
    }
}

export default new AuthService();