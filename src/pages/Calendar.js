// components/Calendar.js
import React from 'react';
import './calendar.css'

const Calendar = () => {
    return (
        <div>
            <section className="calendar-container" >
                <h2>December 2023</h2>
                <table className="table table-bordered table-responsive">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">Mon</th>
                        <th scope="col">Tue</th>
                        <th scope="col">Wed</th>
                        <th scope="col">Thu</th>
                        <th scope="col">Fri</th>
                        <th scope="col">Sat</th>
                        <th scope="col">Sun</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="calendar-day-empty"></td>
                        <td className="calendar-day-empty"></td>
                        <td className="calendar-day-empty"></td>
                        <td className="calendar-day-empty"></td>
                        <td className="calendar-day-empty"></td>
                        <td className="calendar-day-empty"></td>
                        <td><a href="day.html">
                            <div className="calendar-day">1</div>
                        </a></td>
                    </tr>
                    <tr>
                        <td><a href="day.html">
                            <div className="calendar-day">2</div>
                        </a></td>
                        <td><a href="day.html">
                            <div className="calendar-day">3</div>
                        </a></td>
                        <td><a href="day.html">
                            <div className="calendar-day">4</div>
                        </a></td>
                        <td><a href="day.html">
                            <div className="calendar-day">5</div>
                        </a></td>
                        <td><a href="day.html">
                            <div className="calendar-day">6</div>
                        </a></td>
                        <td><a href="day.html">
                            <div className="calendar-day">7</div>
                        </a></td>
                        <td ><a href="day.html">
                            <div className="calendar-day">8</div>
                        </a></td>
                    </tr>
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default Calendar;

