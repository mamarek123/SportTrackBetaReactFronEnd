import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';
import "./Exercise.css";

import config from '../config/config';

const API_URL = config.API_URL;

export default function Exercise() {

    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = (`0${today.getMonth() + 1}`).slice(-2); // Adding 1 because getMonth() returns 0-11
        const day = (`0${today.getDate()}`).slice(-2);
        return `${year}.${month}.${day}`;
    };

    // Initialize newTraining state with today's date
    const [newTraining, setNewTraining] = useState({
        date: getTodayDate(), // Set default date to today
        repsAndWeights: '',
        note: ''
    });

    const isValidDate = (dateString) => {
        const regEx = /^\d{4}\.\d{2}\.\d{2}$/;
        if (!dateString.match(regEx)) return false;
        const [year, month, day] = dateString.split('.').map(num => parseInt(num, 10));
        const date = new Date(year, month - 1, day);
        return date.getFullYear() === year && date.getMonth() + 1 === month && date.getDate() === day;
    };



    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const exerciseName = searchParams.get('name');
    const [trainings, setTrainings] = useState([]);

    const handleAddTraining = async () => {
        if (!isValidDate(newTraining.date) || !newTraining.repsAndWeights || !newTraining.note) {
            alert('Please ensure all fields are correctly filled and the date is in YYYY.MM.DD format.');
            return;
        }

        const [year, month, day] = newTraining.date.split('.').map(num => parseInt(num, 10));
        const dateTime = new Date(year, month - 1, day, 12, 0).toISOString();

        const trainingData = {
            exerciseName: exerciseName,
            repsAndWeights: newTraining.repsAndWeights,
            note: newTraining.note,
            dateTime: dateTime,
        };
        console.log(dateTime);
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/trainings/add`, trainingData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
            window.location.reload();
        } catch (error) {
            console.error('Failed to add new training:', error);
            alert('Failed to add training. Please check console for details.');
        }
    };


    const handleDelete = async (dateString) => {
        const [year, month, day] = dateString.split('.').map(num => parseInt(num, 10));

        const deleteTrainingData = {
            exerciseName: exerciseName,
            year: year,
            month: month,
            day: day,
        };

        try {
            await axios.delete(API_URL, {
                data: deleteTrainingData,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
            window.location.reload();
        } catch (error) {
            console.error('Failed to delete training:', error);
            alert('Failed to delete training. Please check console for details.');
        }
    };


    useEffect(() => {
        const fetchTrainingsForExercise = async () => {
            try {
                const response = await axios.get(API_URL, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    params: {
                        exercise: exerciseName,
                    },
                });
                setTrainings(response.data);
                console.log('Fetched trainings for exercise:', response.data);
            } catch (error) {
                console.error("Failed to fetch trainings:", error);
            }
        };

        if (exerciseName) {
            fetchTrainingsForExercise();
        }
    }, [exerciseName]);

    return (
        <div className="table-container">
            <h2>Exercise: {exerciseName}</h2>
            <table className="table table-striped rounded-table shadow-table">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Reps x Weight</th>
                    <th scope="col">Note</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {trainings.map((training, index) => (
                    <tr key={index}>
                        <td>{training.dateTime.split('T')[0].replace(/-/g, '.')}</td>
                        <td>{training.repsAndWeights}</td>
                        <td>{training.note}</td>
                        <td>
                            <button className="btn btn-danger" onClick={() => handleDelete(training.dateTime.split('T')[0].replace(/-/g, '.'))}>Delete</button>
                        </td>
                    </tr>
                ))}
                <tr>
                    <td>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="YYYY.MM.DD"
                            value={newTraining.date}
                            onChange={e => setNewTraining({...newTraining, date: e.target.value})}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            className="form-control"
                            value={newTraining.repsAndWeights}
                            onChange={e => setNewTraining({...newTraining, repsAndWeights: e.target.value})}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            className="form-control"
                            value={newTraining.note}
                            onChange={e => setNewTraining({...newTraining, note: e.target.value})}
                        />
                    </td>
                    <td>
                        <button className="btn btn-success" onClick={handleAddTraining}>Add</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}


