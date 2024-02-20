// components/Calendar.js
//import React from 'react';
//import './calendar.css'

// const Calendar = () => {
//     return (
//         <div>
//             <section className="calendar-container" >
//                 <h2>December 2023</h2>
//                 <table className="table table-bordered table-responsive">
//                     <thead className="thead-dark">
//                     <tr>
//                         <th scope="col">Mon</th>
//                         <th scope="col">Tue</th>
//                         <th scope="col">Wed</th>
//                         <th scope="col">Thu</th>
//                         <th scope="col">Fri</th>
//                         <th scope="col">Sat</th>
//                         <th scope="col">Sun</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     <tr>
//                         <td className="calendar-day-empty"></td>
//                         <td className="calendar-day-empty"></td>
//                         <td className="calendar-day-empty"></td>
//                         <td className="calendar-day-empty"></td>
//                         <td className="calendar-day-empty"></td>
//                         <td className="calendar-day-empty"></td>
//                         <td><a href="day.html">
//                             <div className="calendar-day">1</div>
//                         </a></td>
//                     </tr>
//                     <tr>
//                         <td><a href="day.html">
//                             <div className="calendar-day">2</div>
//                         </a></td>
//                         <td><a href="day.html">
//                             <div className="calendar-day">3</div>
//                         </a></td>
//                         <td><a href="day.html">
//                             <div className="calendar-day">4</div>
//                         </a></td>
//                         <td><a href="day.html">
//                             <div className="calendar-day">5</div>
//                         </a></td>
//                         <td><a href="day.html">
//                             <div className="calendar-day">6</div>
//                         </a></td>
//                         <td><a href="day.html">
//                             <div className="calendar-day">7</div>
//                         </a></td>
//                         <td><a href="day.html">
//                             <div className="calendar-day">8</div>
//                         </a></td>
//                     </tr>
//                     <tr>
//                         <td><a href="day.html">
//                             <div className="calendar-day">2</div>
//                         </a></td>
//                         <td><a href="day.html">
//                             <div className="calendar-day">3</div>
//                         </a></td>
//                         <td><a href="day.html">
//                             <div className="calendar-day">4</div>
//                         </a></td>
//                         <td><a href="day.html">
//                             <div className="calendar-day">5</div>
//                         </a></td>
//                         <td><a href="day.html">
//                             <div className="calendar-day">6</div>
//                         </a></td>
//                         <td><a href="day.html">
//                             <div className="calendar-day">7</div>
//                         </a></td>
//                         <td><a href="day.html">
//                             <div className="calendar-day">8</div>
//                         </a></td>
//                     </tr>
//                     </tbody>
//                 </table>
//             </section>
//         </div>
//     );
// };
//
// export default Calendar;
//
import './calendar.css'
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate

const Calendar = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Use useNavigate hook for navigation
    const searchParams = new URLSearchParams(location.search);
    const dateParam = searchParams.get('date');

    // If 'date' param is present, create a Date object; otherwise, use current date
    const date = dateParam ? new Date(dateParam) : new Date();

    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

    const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
    const year = date.getFullYear();

    const month = date.getMonth();
    const days = daysInMonth(year, month);
    const firstDay = firstDayOfMonth(year, month);
    const startDay = firstDay === 0 ? 6 : firstDay - 1;

    const weeks = [];

    let day = 1;
    const numRows = Math.ceil((days + startDay) / 7);

    const navigateDay = (year, month, day) => {
        // Correctly formats the date for navigation
        const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        navigate(`/ExercisesForDay?date=${dateString}`);
    };

    for (let i = 0; i < numRows; i++) {
        const week = [];
        for (let j = 0; j < 7; j++) {
            if ((i === 0 && j < startDay) || day > days) {
                week.push(<td className="calendar-day-empty" key={`empty-${i}-${j}`}></td>);
            } else {
                week.push(
                    <td key={`${year}-${month + 1}-${day}`}>
                        <div className="calendar-day" onClick={() => navigateDay(year, month, day)}>
                            {day}
                        </div>
                    </td>
                );
                day++;
            }
        }
        weeks.push(<tr key={`week-${i}`}>{week}</tr>);
    }

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    const navigateMonth = (offset) => {
        const newDate = new Date(date.getFullYear(), date.getMonth() + offset,15);
        const newDateParam = newDate.toISOString().slice(0, 10); // Format to YYYY-MM-DD
        navigate(`/Calendar?date=${newDateParam}`); // Navigate to the new date
    };

    return (
        <div>
            <section className="calendar-container">
                <div className="month-navigation d-flex justify-content-between align-items-center">
                    <button className="btn btn-outline-primary" onClick={() => navigateMonth(-1)}>{"< Prev"}</button>
                    <h2 className="flex-grow-1 text-center">{monthNames[month]} {year}</h2>
                    <button className="btn btn-outline-primary" onClick={() => navigateMonth(1)}>{"Next >"}</button>
                </div>
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
                    {weeks}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default Calendar;
