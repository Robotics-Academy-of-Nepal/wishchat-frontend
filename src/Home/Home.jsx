import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import goodwishLogo from '../assets/wishchat-logo.png';
import goodwishvideo from '../assets/wishchat.mp4';
import styles from './home.module.css';
import axios from 'axios';

function Home() {
    const navigate = useNavigate();
    const [animationComplete, setAnimationComplete] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userPicture, setUserPicture] = useState('');

    useEffect(() => {
        // Check if user is authenticated
        const token = localStorage.getItem('token');
        const pic = localStorage.getItem('Picture');
        if (token) {
            setIsAuthenticated(true);
            setUserPicture(pic);
        }

        // Animation timer
        const timer = setTimeout(() => {
            setAnimationComplete(true);
        }, 7500);

        return () => clearTimeout(timer);
    }, []);

    const handleGetStarted = () => {
        if (isAuthenticated) {
            navigate('/dashboard');
        } else {
            navigate('/signin');
        }
    };

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            // Make API call to logout endpoint
            await axios.post('https://wishchat.goodwish.com.np/auth/logout/', {}, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            
            // Clear all localStorage items
            localStorage.clear();
            
            // Reset states
            setIsAuthenticated(false);
            setUserPicture('');
            
            // Navigate to home
            navigate('/home');
        } catch (error) {
            console.error('Logout error:', error);
            // Still clear localStorage and reset states even if API call fails
            localStorage.clear();
            setIsAuthenticated(false);
            setUserPicture('');
            navigate('/home');
        }
    };

    return (
        <>
            <div onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>        
                <img className={styles.logo} src={goodwishLogo} alt="Goodwish Logo" />
            </div>
            <nav className={styles.navigation}>
                <ul>
                    <li className={styles.headers} onClick={() => navigate('/tutorials')} style={{ cursor: 'pointer' }}>
                        Tutorials
                    </li>
                    <li className={styles.headers} onClick={() => navigate('/features')} style={{ cursor: 'pointer' }}>
                        Features
                    </li>
                    <li className={styles.headers} onClick={() => navigate('/pricing')} style={{ cursor: 'pointer' }}>
                        Pricing
                    </li>
                    {isAuthenticated ? (
                        <>
                            <li className={styles.headers} onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
                                Chatbot
                            </li>
                            <li className={styles.headers} onClick={handleLogout} style={{ cursor: 'pointer' }}>
                                Logout
                            </li>
                        </>
                    ) : (
                        <li className={styles.rightelement} onClick={() => navigate('/signin')} style={{ cursor: 'pointer' }}>
                            Signin
                        </li>
                    )}
                </ul>
            </nav>
            <div>
                <div className={styles.leftContainers}>
                    <p className={styles.greetings}>
                        Welcome to WishChat
                    </p>
                    <p className={styles.subheading}>
                        The power of AI-powered Chatbots at the click of your mouse.
                    </p>
                    <button 
                        className={styles.getStartedButton}
                        onClick={handleGetStarted}
                    >
                        {isAuthenticated ? 'Go to Dashboard →' : 'Get Started →'}
                    </button>
                </div>
                <div className={styles.rightContainers}>
                    <video className={styles.video} src={goodwishvideo} muted autoPlay loop playsInline></video>
                </div>
            </div>
        </>
    );
}

export default Home;