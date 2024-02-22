// components/Calendar.js
import './home.css';
import React from 'react';

export default function Home() {
    return (
        <div className="home-container">
            <h1>"Nothing Will Work...</h1>
            <div className="quote-container">
                <h1>Unless You Do"</h1>
                <h4>~Paulo Coelho</h4>
            </div>
            <h2>Welcome to the Gym</h2>
            <p>Welcome to the ultimate fitness experience. Our app offers state-of-the-art equipment, professional
                training services, and a supportive community to help you achieve your fitness goals.</p>
            <h3>Track Your Progress</h3>
            <p>With our dedicated progress tracking app, you can monitor your workouts, set goals, and see your
                improvements over time. Stay motivated and on track with easy-to-use features tailored to your fitness
                journey.</p>
            <div className="cta-container">
                <iframe width="560" height="315"
                        src="https://www.youtube.com/embed/eaRQF-7hhmo?si=XSOe6xwMU5zfKtRU&amp;controls=0"
                        title="YouTube video player" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen></iframe>
            </div>
        </div>
    );
};
