import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios'; // Ensure you have axios installed
import "./ExercisesForDay.css";

export default function ExercisesForDay() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const dateParam = searchParams.get('date');
    const [trainings, setTrainings] = useState([]);
    const [newTraining, setNewTraining] = useState({exerciseName: '', repsAndWeights: '', note: ''});

    const isValidDate = (dateString) => {
        const regEx = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateString.match(regEx)) return false;
        const d = new Date(dateString);
        if (!d.getTime() && d.getTime() !== 0) return false;
        return d.toISOString().slice(0, 10) === dateString;
    };

    useEffect(() => {
        const fetchTrainings = async () => {
            console.log(localStorage.getItem('token'))
            if (isValidDate(dateParam)) {
                const dateParts = dateParam.split('-'); // Assuming dateParam is 'YYYY-MM-DD'
                try {
                    const response = await axios.get('http://localhost:8080/trainings/ForDay', {
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
        // Hardcoded training data as per your request
        const trainingData = {
            exerciseName: "Squats",
            repsAndWeights: "3 sets of 10 reps @ 100kg",
            note: "Felt strong, keep same weight next session.",
            dateTime: "2024-02-21T10:00:00" // Specific date and time
        };

        try {
            const response = await axios.post('http://localhost:8080/trainings/add', trainingData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming the token is in localStorage
                    'Content-Type': 'application/json'
                }
            });

            console.log('Training added successfully:', response.data);
            // Here, you might want to update your UI to reflect the added training
            // For example, by updating state or redirecting the user
        } catch (error) {
            console.error('Failed to add new training:', error);
            // Here, you might want to handle the error, such as displaying a message to the user
        }
    };
    const handleModify = (trainingId) => {
        // Implement logic to modify training
        console.log('Modifying training:', trainingId);
    };

    const handleDelete = (trainingId) => {
        // Implement logic to delete training
        console.log('Deleting training:', trainingId);
        // Fetch trainings to refresh the list
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
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {trainings.map((training, index) => (
                    <tr key={index}>
                        <td>{training.exerciseName}</td>
                        <td>{training.repsAndWeights}</td>
                        <td>{training.note}</td>
                        <td>
                            <button className="btn btn-primary" onClick={() => handleModify(training.dateTime)}>Modify</button>{' '}
                            <button className="btn btn-danger" onClick={() => handleDelete(training.dateTime)}>Delete</button>
                        </td>
                    </tr>
                ))}
                <tr>
                    <td><input type="text" className="form-control" value={newTraining.exerciseName} onChange={e => setNewTraining({...newTraining, exerciseName: e.target.value})} /></td>
                    <td><input type="text" className="form-control" value={newTraining.repsAndWeights} onChange={e => setNewTraining({...newTraining, repsAndWeights: e.target.value})} /></td>
                    <td><input type="text" className="form-control" value={newTraining.note} onChange={e => setNewTraining({...newTraining, note: e.target.value})} /></td>
                    <td><button className="btn btn-success" onClick={handleAddTraining}>Add</button></td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}
