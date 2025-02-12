import { useNavigate } from 'react-router-dom';
import background from '../assets/back.png';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useState, useEffect } from 'react';

function SignIn() {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [data, setData] = useState(null);

    useEffect(() => {
        localStorage.removeItem('has_active_chatbot');
        localStorage.removeItem('filename');
        localStorage.removeItem('companyname');
        
        const fetchData = async () => {
            try {
                const response = await axios.get('https://wishchat.goodwish.com.np/auth/fetch-data/');
                setData(response.data);
                localStorage.setItem('has_active_chatbot', JSON.stringify(response.data.has_active_chatbot));
                localStorage.setItem('filename', response.data.filename);
                localStorage.setItem('companyname', response.data.company_name);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData(); // Initial fetch
        const interval = setInterval(fetchData, 1000); // Fetch every second

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleLoginSuccess = (response) => {
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('apiKey', response.data.api_key);
            localStorage.setItem('has_active_chatbot', JSON.stringify(response.data.user.has_active_chatbot));
            localStorage.setItem('filename', response.data.filename);
            localStorage.setItem('companyname', response.data.company_name);
            localStorage.setItem('email', response.data.user.email);
            localStorage.setItem('FirstName', response.data.user.first_name);
            localStorage.setItem('LastName', response.data.user.last_name);
            localStorage.setItem('Picture', response.data.google_data.picture);
            
            navigate(response.data.company_name ? '/dashboard' : '/company');
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-r from-blue-600 via-purple-700 to-indigo-800">
            <img className="absolute inset-0 object-cover w-full h-full opacity-30" src={background} alt="Background" />
            <div className="relative z-10 p-8 m-4 bg-white rounded-xl shadow-2xl w-[90%] max-w-lg lg:max-w-md bg-opacity-90 transform transition duration-300 hover:scale-105 hover:shadow-3xl">
                <h1 className="text-4xl font-bold text-center text-gray-800 md:text-5xl">Welcome Back</h1>
                <p className="mt-3 mb-6 text-sm text-center text-gray-600">Sign in to access your dashboard.</p>
                {data && <p className="text-sm text-center text-gray-500">Latest Data: {JSON.stringify(data)}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="Username" className="block mb-2 text-sm font-medium text-gray-700">Username</label>
                        <input className="w-full px-4 py-3 text-sm text-gray-900 transition duration-300 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-md" type="text" id="Username" name="Username" placeholder="Enter your username" aria-label="Username" />
                    </div>
                    <div>
                        <label htmlFor="Password" className="block mb-2 text-sm font-medium text-gray-700">Password</label>
                        <input className="w-full px-4 py-3 text-sm text-gray-900 transition duration-300 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-md" type="password" id="Password" name="Password" placeholder="Enter your password" aria-label="Password" />
                    </div>
                    <button className="w-full py-3 text-sm font-semibold text-white transition duration-300 rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-400" type="submit">Sign In</button>
                </form>
                <div className='flex items-center justify-center'>
                    <div className="mt-6">
                        <GoogleLogin
                            onSuccess={(credentialResponse) => {
                                axios.post("https://wishchat.goodwish.com.np/auth/google-login/", {
                                    auth_token: credentialResponse.credential,
                                })
                                .then((response) => handleLoginSuccess(response))
                                .catch((error) => setMessage("Error: " + (error.response?.data?.message || "Google login failed.")));
                            }}
                            onError={() => setMessage("Google login failed. Please try again.")}
                            className="w-full py-3 text-sm font-semibold text-white transition duration-300 rounded-lg shadow-lg bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-red-400"
                        />
                    </div>
                </div>
                {message && <div className="mt-4 text-sm text-center text-red-500">{message}</div>}
            </div>
        </div>
    );
}

export default SignIn;
