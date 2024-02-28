import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ isLoggedIn, handleLogout }) {
    const navigate = useNavigate();

    const onLogout = () => {
        handleLogout();
        navigate('/login');
    };

    const currentDate = new Date().toISOString().slice(0, 10); // Gets date in YYYY-MM-DD format
    const username = JSON.parse(localStorage.getItem('user')); // Assuming this safely handles null

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    {/* Corrected Link usage for routing in React */}
                    <Link className="navbar-brand" to="/Home">SportTrack</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {isLoggedIn && (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link active" to={`/Calendar?date=${currentDate}`}>Calendar</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" to="/Exercises">Exercises</Link>
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
                                    <Link to="/login" className="btn btn-outline-success me-2">Login</Link> {/* Added me-2 for spacing */}
                                    <Link to="/register" className="btn btn-outline-success">Register</Link>
                                </div>
                            ) : (
                                <div>
                                    <span className="navbar-text text-white me-3">Welcome, {username}</span> {/* Improved readability */}
                                    <button onClick={onLogout} className="btn btn-outline-danger">Logout</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}
