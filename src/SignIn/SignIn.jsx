import { useNavigate } from 'react-router-dom';
import styles from './signin.module.css'
import background from '../assets/background.jpg'
import features from '../assets/features.jpg'
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useState } from 'react';



function SignIn() {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your sign-in logic here
    };

    const handleLoginSuccess = (response) => {
        // Handle successful login here
        // For example, store the token in localStorage
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('apiKey', response.data.api_key);
            localStorage.setItem('has_active_chatbot', JSON.stringify(response.data.user.has_active_chatbot));
            localStorage.setItem('filename', response.data.filename );
            localStorage.setItem('companyname', response.data.company_name);
            const hasActiveChatbot = JSON.parse(localStorage.getItem('has_active_chatbot'));
            localStorage.setItem('email', response.data.user.email);
            localStorage.setItem('FirstName', response.data.user.first_name);
            localStorage.setItem('LastName', response.data.user.last_name);
            localStorage.setItem('Picture', response.data.google_data.picture);
            if (response.data.company_name) {
                
                navigate('/dashboard');
            } else {
                // If no company_name, redirect to company form
                navigate('/company');
            }
    
        }
    };

    return (
        <>
            <div className={styles.signinContainer}>
                <img className={styles.backgroundImage} src={background} alt='background image' />
                <form onSubmit={handleSubmit}>
                    <div className={styles.secondContainer}>
                        <div>
                            <h1 className={styles.title}>Welcome</h1>

                            <label  htmlFor="Username">Username</label>
                            <input className={styles.form}
                                type="text" 
                                id="Username" 
                                name="Username" 
                            />
                        </div>
                    
                        <div>
                            <label  htmlFor="Password">Password</label>
                            <input className={styles.form}
                                type="password" 
                                id="Password" 
                                name="Password" 
                            />
                        </div>
                        <button className={styles.loginButton} type="submit">Sign In</button>
                    </div>

                    
                    {/* <div onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>        
                        <img className={styles.googleButton} src={googleimage} alt="Goodwish Logo" />
                    </div> */}

                    <div className={styles.googleButton}>
                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                axios.post("https://wishchat.goodwish.com.np/auth/google-login/", {
                                    auth_token: credentialResponse.credential
                                })
                                .then(response => {
                                    handleLoginSuccess(response);
                                })
                                .catch(error => {
                                    setMessage("Error: " + (error.response?.data?.message || "Google login failed."));
                                });
                            }}
                            onError={() => {
                                setMessage("Google login failed. Please try again.");
                            }}
                        />
                    </div>
                    
                    {/* Display error message if any */}
                    {message && <div className={styles.errorMessage}>{message}</div>}
                    
                    
                </form>
                
            </div>
            <div className={styles.imageContainer}>
                    <img className={styles.featureImage} src={background} alt='Feature image' />
                    <img className={styles.wishchatimage} src={features} alt='Feature image' />
            </div>
            
        </>
    );
}

export default SignIn