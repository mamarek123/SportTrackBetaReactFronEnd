import React, { useState, useEffect } from 'react';
import {Link, useLocation} from "react-router-dom";
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
                    console.log('fetched' + response.data)
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


        const dateFromUrl = new URLSearchParams(window.location.search).get('date');


        const dateTime = `${dateFromUrl}T05:00:00`;

        const trainingData = {
            exerciseName: newTraining.exerciseName,
            repsAndWeights: newTraining.repsAndWeights,
            note: newTraining.note,
            dateTime: dateTime
        };

        try {
            const response = await axios.post('http://localhost:8080/trainings/add', trainingData, {
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

    const handleDelete = async (exerciseName) => {
        // Extract the date from the URL
        const dateFromUrl = new URLSearchParams(window.location.search).get('date');
        const [year, month, day] = dateFromUrl.split('-').map(num => parseInt(num, 10));

        const deleteTrainingData = {
            exerciseName,
            year,
            month: month ,
            day,
        };

        try {
            await axios.delete('http://localhost:8080/trainings/delete', {
                data: deleteTrainingData, // Axios DELETE requests require data to be in the 'data' field
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log('Training deleted successfully');
            window.location.reload(); // Reload to update the list of trainings
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
                        <td>
                            <Link to={`/Exercise?name=${encodeURIComponent(training.exerciseName)}`}>
                                {training.exerciseName}
                            </Link>
                        </td>
                        <td>{training.repsAndWeights}</td>
                        <td>{training.note}</td>
                        <td>
                            <button className="btn btn-danger" onClick={() => handleDelete(training.exerciseName)}>Delete</button>
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
