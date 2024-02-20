import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";

export default function ExercisesForDay() {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const dateParam = searchParams.get('date');

    // Validate the date and format it
    const isValidDate = (dateString) => {
        const regEx = /^\d{4}-\d{2}-\d{2}$/;
        if(!dateString.match(regEx)) return false;  // Invalid format
        const d = new Date(dateString);
        const dNum = d.getTime();
        if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
        return d.toISOString().slice(0,10) === dateString;
    };

    const formattedDate = isValidDate(dateParam)
        ? new Date(dateParam).toLocaleDateString()
        : 'Invalid date';

    return (
        <div className="exercise-table-container">
            <h2>Lista ćwiczeń wykonanych w dniu {formattedDate}</h2>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">Exercise</th>
                    <th scope="col">Reps x Weight</th>
                    <th scope="col">Note</th>
                </tr>
                </thead>
                <tbody>
                {/* Example rows, dynamically render based on data */}
                <tr>
                    <td>Squats</td>
                    <td>3x10 @ 100kg</td>
                    <td>Dobra forma</td>
                </tr>
                {/* More rows go here */}
                </tbody>
            </table>
        </div>
    );
}
