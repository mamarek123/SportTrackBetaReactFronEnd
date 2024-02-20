// services/AuthService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/'; // Update with your API's base URL

class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + 'token', { username, password })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem('user', JSON.stringify(response.data.username));
                    localStorage.setItem('token', JSON.stringify(response.data.token));
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

    // Add this method to your existing AuthService.js
    register(username, password) {
        return axios.post(API_URL + 'register', {
            username,
            password,
        });
    }

}

export default new AuthService();