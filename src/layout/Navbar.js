import {Link, useNavigate} from "react-router-dom";


export default function Navbar({isLoggedIn, handleLogout}) {

    const navigate = useNavigate();

    const onLogout = () => {
        handleLogout();
        navigate('/login');
    };

    const currentDate = new Date().toISOString().slice(0, 10); // Gets date in YYYY-MM-DD format

    const username = JSON.parse(localStorage.getItem('user'));

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" href="#" to="/Home">SportTrack</Link>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {isLoggedIn && (
                                <>
                                    <li className="nav-item">
                                        {/*<Link className="nav-link active" to="/Calendar">Calendar</Link>*/}
                                        <Link className="nav-link active" to={`/Calendar?date=${currentDate}`}>Calendar</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" to="/Exercises">Exercises</Link>
                                    </li>
                                </>
                            )}
                            <li className="navbar-nav me-auto mb-2 mb-lg-0">
                                <Link className="nav-link active" to="/Info">Information</Link>
                            </li>
                        </ul>
                        <div>
                            {!isLoggedIn ? (
                                <div>
                                    <Link to="/login" className="btn btn-outline-success">Login</Link>
                                    <Link to="/register" className="btn btn-outline-success">Register</Link>
                                </div>
                            ) : (
                                <div>
                                    <span className="text-white">Welcome {username} </span>
                                    <button onClick={onLogout} className="btn btn-outline-danger">Logout</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

        </div>
    )
}
