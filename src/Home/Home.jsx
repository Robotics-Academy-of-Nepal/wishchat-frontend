import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import goodwishLogo from '../assets/wishchat-logo.png';
import goodwishvideo from '../assets/wishchat.mp4';
import styles from './home.module.css';
import axios from 'axios';

function Home() {
    const navigate = useNavigate();
    const [animationComplete, setAnimationComplete] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(true);
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



            <div className="flex flex-col items-center justify-between px-6 py-10 md:flex-row"
          >
  <div className="flex flex-col items-start justify-center space-y-4 ">
    <p className="text-5xl font-bold text-center md:text-left"
        style={{ fontFamily: 'Helvetica' }}>
      Welcome to WishChat
    </p>
    <p className="text-lg font-semibold text-center md:text-left">
      The power of AI-powered Chatbots at the click of your mouse.
    </p>
    <button 
      className="px-6 py-2 text-white transition bg-blue-500 rounded-md shadow-md hover:bg-blue-600"
      
       style={{ fontFamily: 'Helvetica' }}onClick={handleGetStarted}
    >
      {isAuthenticated ? 'Go to Dashboard →' : 'Get Started →'}
    </button>
  </div>
  <div className="w-full md:w-[700px] mt-8 md:mt-0">
    <video className="w-full h-auto border-2 border-black border-solid rounded-lg md:h-auto" src={goodwishvideo} muted autoPlay loop playsInline></video>
  </div>
</div>

        </>
    );
}

export default Home;