import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import config from '../config/config';

const API_URL = config.API_URL;

const Exercises = () => {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(API_URL + '/trainings/user/exercises', {
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
            <h2>Here are all exercises you saved</h2>
            <table className="table table-striped rounded-table shadow-table" >
                <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Exercise:</th>
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
