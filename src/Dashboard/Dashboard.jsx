import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";

function Dashboard() {
    const navigate = useNavigate();
    const [hasActiveChatbot, setHasActiveChatbot] = useState(false);

    const companyName = localStorage.getItem("companyname");
    const pic = localStorage.getItem("Picture");

    useEffect(() => {
        const chatbotStatus = JSON.parse(localStorage.getItem("has_active_chatbot"));
        setHasActiveChatbot(chatbotStatus);
    }, []);

    return (
        <>
            <Navbar />
            <div className="w-full h-[560px] bg-gray-100 p-8 flex justify-center items-center">
                {hasActiveChatbot ? (
                    <button
                        className="h-64 p-5 text-center transition-all duration-300 bg-center bg-no-repeat bg-cover border border-gray-300 rounded-lg shadow-sm w-52 hover:shadow-lg hover:scale-110 hover:brightness-105"
                        style={{ backgroundImage: `url('../assets/wishchat-logo.png')` }}
                        onClick={() => navigate('/playground')}
                    >
                        <p className="text-lg font-semibold text-gray-800 mt-36">
                            {companyName}
                        </p>
                    </button>
                ) : (
                    <>
                    <div className="flex flex-col">
                     <div>
                        <h1 className="mb-2 font-semibold text-green-800 text-md">Create Your First Chatbot.</h1>
                     </div>
                    <button
                        className="px-6 py-3 text-xl text-white transition-all duration-300 bg-blue-600 border border-transparent rounded-md shadow-md hover:bg-blue-700 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onClick={() => navigate('/upload')}
                    >
                        New Chatbot
                    </button>
                    </div>
                    </>
                )}
            </div>
        </>
    );
}

export default Dashboard;
