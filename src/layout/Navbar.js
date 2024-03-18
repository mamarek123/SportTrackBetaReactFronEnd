import { Link, useNavigate } from "react-router-dom";
import React from "react"; // Ensure React is in scope when using JSX

export default function Navbar({ isLoggedIn, handleLogout }) {
    const navigate = useNavigate();

    const onLogout = () => {
        handleLogout();
        navigate('/login');
    };

    // Gets today's date in YYYY-MM-DD format
    const currentDate = new Date().toISOString().slice(0, 10);
    const username = JSON.parse(localStorage.getItem('user')); // Ensure null is handled

    return (
        <div>
            <style>
                {`
                    .navbar-nav {
                        display: flex;
                        flex-direction: row;
                        padding-left: 0;
                        margin-bottom: 0;
                        list-style: none;
                    }
                    .nav-item {
                        padding: 0.5rem;
                    }
                    @media (max-width: 600px) {
                        .navbar-nav {
                            flex-direction: column;
                        }
                        .nav-item {
                            width: 100%;
                            text-align: center;
                        }
                    }
                `}
            </style>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/Home">SportTrack</Link>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {isLoggedIn && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link active" to={`/Calendar?date=${currentDate}`}>Calendar</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/Exercises">Exercises</Link>
                                </li>
                                {/* New Today navbar item */}
                                <li className="nav-item">
                                    <Link className="nav-link active" to={`/ExercisesForDay?date=${currentDate}`}>Today</Link>
                                </li>
                            </>
                        )}
                        <li className="nav-item">
                            <Link className="nav-link active" to="/Info">Information</Link>
                        </li>
                    </ul>
                    <div>
                        {!isLoggedIn ? (
                            <div>
                                <Link to="/login" className="btn btn-outline-success me-2">Login</Link>
                                <Link to="/register" className="btn btn-outline-success">Register</Link>
                            </div>
                        ) : (
                            <div>
                                <span className="navbar-text text-white me-3">Welcome, {username}</span>
                                <button onClick={onLogout} className="btn btn-outline-danger">Logout</button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}

