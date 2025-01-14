import styles from './company.module.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

function Company(){

    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const [error, setError] = useState('');
    
    
    const handleSubmitButton = async (e) => {
        e.preventDefault();
        
        if (!companyName.trim()) {
            setError('Company name is required');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://wishchat.goodwish.com.np/auth/update-company/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                body: JSON.stringify({ company_name: companyName })
            });

            if (!response.ok) {
                throw new Error('Failed to update company name');
            }

            // Store company name in localStorage
            localStorage.setItem('company_name', companyName);
            
            // Navigate to dashboard
            navigate('/dashboard');
        } catch (error) {
            setError('Failed to update company name. Please try again.');
        }
    };


    return(
        <>
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <label className={styles.title} htmlFor="Company Name">Company Name</label><br />
                <input className={styles.form}
                    type="text" 
                    id="Company Name" 
                    name="Company Name"
                    placeholder="Company Name" 
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                />
                <button className={styles.submitButton } onClick={handleSubmitButton} type="submit">Submit</button>
            </div>
        </div>
        </>
    );
}

export default Company;