import React, {useState, useEffect} from 'react';
import {Link, useLocation} from "react-router-dom";
import axios from 'axios';

import config from '../config/config';

const API_URL = config.API_URL;

export default function ExercisesForDay() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const dateParam = searchParams.get('date');
    const [trainings, setTrainings] = useState([]);
    // Initialize newTraining state with an additional date property

    const getCurrentTime = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const [newTraining, setNewTraining] = useState({
        exerciseName: '',
        repsAndWeights: '',
        note: '',
        time: getCurrentTime(), // Initialize with current time
    });

    const isValidDate = (dateString) => {
        const regEx = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateString.match(regEx)) return false;
        const d = new Date(dateString);
        if (!d.getTime() && d.getTime() !== 0) return false;
        return d.toISOString().slice(0, 10) === dateString;
    };

    useEffect(() => {
        const fetchTrainings = async () => {
            if (isValidDate(dateParam)) {
                const dateParts = dateParam.split('-');
                try {
                    const response = await axios.get(API_URL + '/trainings/ForDay', {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                        params: {
                            year: dateParts[0],
                            month: dateParts[1],
                            day: dateParts[2],
                        },
                    });
                    setTrainings(response.data);
                    console.log('fetched' + response.data)
                } catch (error) {
                    console.error("Failed to fetch trainings:", error);
                }
            }
        };

        fetchTrainings();
    }, [dateParam]);


    const handleAddTraining = async () => {
        if (!newTraining.exerciseName || !newTraining.repsAndWeights || !newTraining.note || !newTraining.time) {
            alert('Please fill in all fields, including the time for the training session.');
            return;
        }

        const dateTime = `${dateParam}T${newTraining.time}`;

        const trainingData = {
            exerciseName: newTraining.exerciseName,
            repsAndWeights: newTraining.repsAndWeights,
            note: newTraining.note,
            dateTime: dateTime,
        };

        try {
            const response = await axios.post(API_URL + '/trainings/add', trainingData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });

            window.location.reload();
        } catch (error) {
            console.error('Failed to add new training:', error);
            alert('Failed to add training. Please check console for details.');
        }
    };


    const handleDelete = async (trainingId) => {
        const deleteTrainingData = {
            id: trainingId, // Use the ID directly
        };

        try {
            await axios.delete(API_URL + '/trainings/delete', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                data: deleteTrainingData,
            });
            console.log('Training deleted successfully');
            window.location.reload();
        } catch (error) {
            console.error('Failed to delete training:', error);
            alert('Failed to delete training. Please check console for details.');
        }
    };




    const formattedDate = isValidDate(dateParam)
        ? new Date(dateParam).toLocaleDateString()
        : 'Invalid date';

    return (
        <div className="table-container">
            <h2>Here's what you trained on {formattedDate}</h2>
            <table className="table table-striped rounded-table shadow-table">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">Time</th>
                    <th scope="col">Exercise</th>
                    <th scope="col">Reps x Weight</th>
                    <th scope="col">Note</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {trainings.map((training, index) => (
                    <tr key={index}>
                        <td>{new Date(training.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                        <td>
                            <Link to={`/Exercise?name=${encodeURIComponent(training.exerciseName)}`} className="table-link">
                                {training.exerciseName}
                            </Link>
                        </td>
                        <td>{training.repsAndWeights}</td>
                        <td>{training.note}</td>
                        <td>
                            <button className="btn btn-danger" onClick={() => handleDelete(training.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                <tr>
                    <td>
                        <input
                            type="time"
                            className="form-control"
                            value={newTraining.time || ''}
                            onChange={e => setNewTraining({...newTraining, time: e.target.value})}
                        />
                    </td>
                    <td><input type="text" className="form-control" value={newTraining.exerciseName}
                               onChange={e => setNewTraining({...newTraining, exerciseName: e.target.value})}/></td>
                    <td><input type="text" className="form-control" value={newTraining.repsAndWeights}
                               onChange={e => setNewTraining({...newTraining, repsAndWeights: e.target.value})}/></td>
                    <td><input type="text" className="form-control" value={newTraining.note}
                               onChange={e => setNewTraining({...newTraining, note: e.target.value})}/></td>
                    <td>
                        <button className="btn btn-success" onClick={handleAddTraining}>Add</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}
