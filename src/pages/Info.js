import React from 'react';
import './info.css';

export default function Home() {
    return (
        <div className="info-container">
            <h2>App made by:</h2>
            <p>Marek Szkutnik</p>
            <p>and</p>
            <p>Andrzej Mozgawa</p>
            <h3>Contact us here!</h3>

            <div className="cta-container">
                <p>Marek Szkutnik</p>
                <a href="https://github.com/mamarek123" target="_blank" rel="noopener noreferrer">
                    <img src={'https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_1280.png'} alt="GitHub"
                         style={{marginRight: '10px'}}/>
                </a>
                <a href="https://www.linkedin.com/in/marek-szkutnik-336a32271/" target="_blank"
                   rel="noopener noreferrer">
                    <img
                        src={'https://thumbs.dreamstime.com/b/logo-ikony-linkedin-pi%C4%99knie-zaprojektowane-225149200.jpg'}
                        alt="LinkedIn"/>
                </a>
                <p>Andrzej Mozgawa</p>
                <a href="https://github.com/Syzamis" target="_blank" rel="noopener noreferrer">
                    <img src={'https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_1280.png'} alt="GitHub"
                         style={{marginRight: '10px'}}/>
                </a>
                <a href="https://www.linkedin.com/in/andrzej-mozgawa/" target="_blank" rel="noopener noreferrer">
                    <img
                        src={'https://thumbs.dreamstime.com/b/logo-ikony-linkedin-pi%C4%99knie-zaprojektowane-225149200.jpg'}
                        alt="LinkedIn"/>
                </a>
            </div>
        </div>
    );
};
