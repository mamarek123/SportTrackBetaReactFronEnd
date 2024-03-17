import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import AuthService from '../services/AuthService';

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        if (password !== passwordConfirm) {

            alert("Passwords do not match.");
            return;
        }

        AuthService.register(username, password).then(
            (response) => {
                console.log(response);
                navigate('/login');
            },
            (error) => {
                console.log(error);
                alert('Failed to register.');
            }
        );
    };

    return (
        <div className="login-container">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="passwordConfirm" className="form-label">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="passwordConfirm"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success">Register</button>
            </form>
        </div>
    );
}
