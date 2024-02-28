// services/AuthService.js
import axios from 'axios';

const API_URL = 'http://ec2-3-70-127-40.eu-central-1.compute.amazonaws.com:8000/'; // Update with your API's base URL

class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + 'token', { username, password })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem('user', JSON.stringify(response.data.username)); // Keep if you need to store additional data as a string
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

    // Add this method to your existing AuthService.js
    register(username, password) {
        return axios.post(API_URL + 'register', {
            username,
            password,
        });
    }

}

export default new AuthService();