import React, { useState } from "react";
import { FaEnvelope, FaBuilding, FaKey } from "react-icons/fa";
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
            await axios.post('http://192.168.1.38:8000/auth/logout/', {}, {
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
         <div className='flex gap-4'> 
         <div className="flex flex-col px-4 py-6 space-y-4 bg-white border border-gray-200 shadow-md rounded-xl">
    <button className="px-4 py-2 text-white transition-colors bg-blue-500 rounded-lg shadow-sm hover:bg-blue-600"
      onClick={()=>setActiveSection('profile')}
      >
        Profile
    </button>
    <button className="px-4 py-2 text-white transition-colors bg-blue-500 rounded-lg shadow-sm hover:bg-blue-600"
    onClick={()=>setActiveSection('chatdetails')}
    >
        ChatBot Details
    </button>
</div>




     {activateSection == "profile" &&(

   
            <div className="w-full max-w-sm p-6 bg-white shadow-xl sm:max-w-md md:max-w-lg lg:max-w-xl md:p-8 dark:bg-gray-800 rounded-2xl">
                <div className="flex flex-col items-center mb-6">
                    <img
                        className="w-24 h-24 border-4 rounded-full shadow-lg sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 border-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                        src={pic || "https://via.placeholder.com/180"}
                        alt="Profile Picture"
                    />
                    <h1 className="mt-4 text-2xl font-extrabold tracking-wide text-gray-800 sm:text-3xl lg:text-4xl dark:text-gray-200">
                        {firstname || "First Name"} {lastname || "Last Name"}
                    </h1>
                </div>
                <div className="space-y-4 md:space-y-6">
                    <div className="flex flex-col items-center gap-2 text-gray-800 md:flex-row dark:text-gray-300">
                        <div className="flex items-center gap-1 text-sm font-semibold sm:text-md">
                            <h1>EMAIL</h1> <FaEnvelope className="text-blue-500" />
                        </div>
                        <p className="text-sm sm:text-lg">{email || "Not provided"}</p>
                    </div>
                    <div className="flex flex-col items-center gap-2 text-gray-800 md:flex-row dark:text-gray-300">
                        <div className="flex items-center gap-1 text-sm font-semibold sm:text-md">
                            <h1>COMPANY</h1> <FaBuilding className="text-green-500" />
                        </div>
                        <p className="text-sm sm:text-lg">{company || "Not provided"}</p>
                    </div>
                    <div className="flex flex-col items-center gap-2 text-gray-800 md:flex-row dark:text-gray-300">
                        <div className="flex items-center gap-1 text-sm font-semibold sm:text-md">
                            <h1>KEY</h1> <FaKey className="text-yellow-500" />
                        </div>
                        <p className="text-sm sm:text-lg">{api || "Not provided"}</p>
                    </div>
                </div>
                <div className="mt-6 text-center">
                    <button
                        className="px-4 py-2 text-sm font-semibold text-white transition duration-300 bg-red-500 sm:px-6 sm:py-3 sm:text-md rounded-xl hover:shadow-lg"
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
