import logo from './logo.svg';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import {useEffect, useState} from "react";
import AuthService from "./services/AuthService";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Calendar from "./pages/Calendar";
import Exercises from "./pages/Exercises";


const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        AuthService.logout();
        setIsLoggedIn(false);
    };

    return (
        <Router>
            <Navbar isLoggedIn={isLoggedIn}  handleLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/exercises" element={<Exercises />} />
            </Routes>
        </Router>
    );
};

export default App;
