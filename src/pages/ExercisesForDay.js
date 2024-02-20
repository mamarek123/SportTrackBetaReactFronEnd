// components/Calendar.js
import React from 'react';
import {useLocation, useNavigate} from "react-router-dom";

export default function ExercisesForDay() {
    const location = useLocation();
    const navigate = useNavigate(); // Use useNavigate hook for navigation
    const searchParams = new URLSearchParams(location.search);
    const dateParam = searchParams.get('date');

    return (
        <div>
            <h2>These are the exercises you did today bro</h2>
        </div>
    );
};

