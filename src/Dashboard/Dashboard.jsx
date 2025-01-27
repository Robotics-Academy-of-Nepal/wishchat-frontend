import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';


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
          className="shadow-xl shadow-black px-[70px] items-center flex justify-center py-[100px] rounded-md border-gray-400 border-solid hover:scale-105 hover:shadow-black "
              onClick={() => navigate('/playground')}
          >
              <p className="px-2 py-1 text-xl font-semibold text-black rounded-lg shadow-sm bg-white/80 "
               style={{ fontFamily: "Georgia" }}
              >
                  {companyName}
              </p>
          </button>
          
                ) : (
                    <div className="flex flex-col items-center">
                        <h1 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">
                            Create Your Chatbot
                        </h1>
                        <button
                            className="px-8 py-4 text-lg font-medium text-white transition-all duration-300 rounded-lg shadow-md md:text-xl bg-gradient-to-r from-blue-500 to-blue-700 hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onClick={() => navigate('/upload')}
                        >
                            <span className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faRobot} className="text-black" />
                                <span>Create Chatbot</span>
                            </span>
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default Dashboard;
