import axios from 'axios';

import config from '../config/config';

const API_URL = config.API_URL;
class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + '/token', { username, password })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem('user', JSON.stringify(response.data.username));
                    localStorage.setItem('token', response.data.token);
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('token')
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    register(username, password) {
        console.log(API_URL);
        return axios.post(API_URL + '/register', {
            username,
            password,
        });
    }

}

export default new AuthService();