import React, { useState } from "react";
import { FaEnvelope, FaBuilding, FaKey, FaClipboard } from "react-icons/fa";
import background from '../assets/black-back.png';
import ChatDetails from "./ChatDetails";

export default function Profile() {
    const pic = localStorage.getItem("Picture");
    const firstname = localStorage.getItem("FirstName");
    const lastname = localStorage.getItem("LastName");
    const api = localStorage.getItem("apiKey");
    const email = localStorage.getItem("email");
    const company = localStorage.getItem("companyname");

    const [activateSection, setActiveSection] = useState('profile');

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post('https://wishchat.goodwish.com.np/auth/logout/', {}, {
                headers: { 'Authorization': `Token ${token}` }
            });
            localStorage.clear();
            navigate('/home');
        } catch (error) {
            console.error('Logout error:', error);
            localStorage.clear();
            navigate('/home');
        }
    };

    const handleCopy = () => {
        if (api) {
            navigator.clipboard.writeText(api)
                .then(() => {
                  
                })
                .catch((err) => {
                    
                });
        }
    };

    return (
        <div
            className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-purple-200 to-pink-300 dark:bg-gradient-to-r dark:from-gray-700 dark:via-gray-800 dark:to-gray-900"
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '100vh',
                width: '100%',
            }}
        >
            <div className='flex gap-6'>
                <div className="flex flex-col px-6 py-8 space-y-6 bg-white border border-gray-200 shadow-lg rounded-xl w-72">
                    <button
                        className="px-4 py-2 text-white transition-colors bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
                        onClick={() => setActiveSection('profile')}
                    >
                        Profile
                    </button>
                    <button
                        className="px-4 py-2 text-white transition-colors bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
                        onClick={() => setActiveSection('chatdetails')}
                    >
                        ChatBot Details
                    </button>
                </div>

                {activateSection === "profile" && (
                    <div className="w-full max-w-md p-6 bg-white shadow-2xl sm:max-w-lg md:max-w-xl lg:max-w-2xl dark:bg-gray-800 rounded-2xl">
                        <div className="flex flex-col items-center mb-6">
                            <img
                                className="w-32 h-32 transition-transform transform border-4 rounded-full shadow-xl hover:scale-105 hover:rotate-2"
                                src={pic || "https://via.placeholder.com/180"}
                                alt="Profile Picture"
                            />
                            <h1 className="mt-4 text-3xl font-extrabold tracking-wide text-gray-800 sm:text-4xl lg:text-5xl dark:text-gray-800">
                                {firstname || "First Name"} {lastname || "Last Name"}
                            </h1>
                        </div>
                        <div className="space-y-6 md:space-y-4">
                            <div className="flex flex-col items-center gap-3 text-gray-800 md:flex-row dark:text-gray-800">
                                <div className="flex items-center gap-1 text-lg font-semibold sm:text-xl">
                                    <h1>EMAIL</h1>
                                    <FaEnvelope className="text-blue-500" />
                                </div>
                                <p className="text-sm sm:text-lg">{email || "Not provided"}</p>
                            </div>
                            <div className="flex flex-col items-center gap-3 text-gray-800 md:flex-row dark:text-gray-800">
                                <div className="flex items-center gap-1 text-lg font-semibold sm:text-xl">
                                    <h1>COMPANY</h1>
                                    <FaBuilding className="text-green-500" />
                                </div>
                                <p className="text-sm sm:text-lg">{company || "Not provided"}</p>
                            </div>
                            <div className="flex flex-col items-center gap-3 text-gray-800 md:flex-row dark:text-gray-800">
                                <div className="flex items-center gap-1 text-lg font-semibold sm:text-xl">
                                    <h1>KEY</h1>
                                    <FaKey className="text-yellow-500" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <p className="text-sm sm:text-lg">{api || "Not provided"}</p>
                                    <button
                                        onClick={handleCopy}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        <FaClipboard />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 text-center">
                            <button
                                className="px-6 py-3 text-lg font-semibold text-white transition-transform transform bg-red-500 rounded-xl hover:shadow-xl hover:scale-105"
                                onClick={handleLogout}
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                )}

                {activateSection === 'chatdetails' && <ChatDetails />}
            </div>
        </div>
    );
}
