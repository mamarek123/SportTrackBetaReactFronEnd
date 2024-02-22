import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Exercises = () => {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/trainings/user/exercises', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setExercises(response.data);
            } catch (error) {
                console.error('Błąd podczas pobierania ćwiczeń:', error);
            }
        };

        fetchExercises();
    }, []);

    return (
        <div className="table-container">
            <style>
                {`
                    .custom-table-header {
                        background-color: #343a40; /* Deep dark gray */
                        color: white;
                    }
                    .table-striped tbody tr:hover {
                        background-color: #bcbcbc; /* Slight dark on hover */
                    }
                    .rounded-table {
                        border-radius: 0.75rem;
                        overflow: hidden;
                    }
                    .shadow-table {
                        box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
                    }
                    .table-link {
                        color: black; /* Black links, as requested */
                        text-decoration: none; /* Optional: removes underline from links */
                    }
                    .table-link:hover {
                        color: #555; /* Darker color on hover for links */
                    }
                `}
            </style>
            <h2>Ćwiczenia</h2>
            <table className="table table-striped rounded-table shadow-table" style={{ backgroundColor: 'darkgray' }}>
                <thead className="custom-table-header">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nazwa ćwiczenia</th>
                </tr>
                </thead>
                <tbody>
                {exercises.map((exercise, index) => (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>
                            <Link to={`/Exercise?name=${encodeURIComponent(exercise)}`} className="table-link">
                                {exercise}
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Exercises;
