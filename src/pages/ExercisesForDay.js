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
                } catch (error) {
                    console.error("Failed to fetch trainings:", error);
                }
            }
        };

        fetchTrainings();
    }, [dateParam]);


    const handleAddTraining = async () => {
        if (!newTraining.exerciseName || !newTraining.repsAndWeights || !newTraining.note) {
            alert('Please fill in all fields');
            return;
        }

        const dateTime = new Date().toISOString(); // Use the current date and time for simplicity

        try {
            const response = await axios.post('localhost:8080/trainings/add', {
                exerciseName: newTraining.exerciseName,
                repsAndWeights: newTraining.repsAndWeights,
                note: newTraining.note,
                dateTime: dateTime
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Retrieve the JWT token from localStorage
                }
            });

            // Assuming the backend responds with the added training data
            console.log('Training added:', response.data);

            // Clear the input fields
            setNewTraining({exerciseName: '', repsAndWeights: '', note: ''});

            // Optionally, refresh the trainings list to include the new training
            // You might want to create a function to fetch trainings and call it here
        } catch (error) {
            console.error('Failed to add new training:', error);
            alert('Failed to add training. Please try again.');
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
