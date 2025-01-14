import React from "react";
import styles from './dashboard.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import goodwishLogo from '../assets/wishchat-logo.png';

function Dashboard(){

    const navigate = useNavigate();
    const [hasActiveChatbot, setHasActiveChatbot] = useState(false);

    const companyName = localStorage.getItem("companyname")

    const pic = localStorage.getItem("Picture")

    useEffect(() => {
        // Get the value from localStorage when component mounts
        const chatbotStatus = JSON.parse(localStorage.getItem('has_active_chatbot'));
        setHasActiveChatbot(chatbotStatus);
    }, []);
    return(
        <>
        {/* <div onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>        
            <img className={styles.logo} src={goodwishLogo} alt="Goodwish Logo" />
        </div> */}

        <img className={styles.logo} src={goodwishLogo} alt="Logo image" onClick={() => navigate('/home')} style={{ cursor: 'pointer' }} />
        <div>
        <nav className={styles.navigation}>
            <ul>
                <li className={styles.headers} onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
                    Chatbot
                </li>
                <li className={styles.headers} onClick={() => navigate('/playground')} style={{ cursor: 'pointer' }}>
                    Playground
                </li>
                <li className={styles.headers} onClick={() => navigate('/deploy')} style={{ cursor: 'pointer' }}>
                    Deploy
                </li>
                <li className={styles.headers} onClick={() => navigate('/upload')} style={{ cursor: 'pointer' }}>
                    Build
                </li>
            </ul>
        </nav>
        </div>
        <img className={styles.profile} src={pic} alt="Logo image" onClick={() => navigate('/profile')} style={{ cursor: 'pointer' }} />
        <div className={styles.chatbotContainer}>
                {hasActiveChatbot ? (
                    <button className={styles.card} type="button" onClick={() => navigate('/playground')}>
                        <p className={styles.companyname}>{companyName}</p>
                    </button>
                ) : (
                    <button className={styles.chatbotButton} type="button" onClick={() => navigate('/upload')}>New Chatbot</button>
                )}
            </div>
        
        </>
    );
}


export default Dashboard;