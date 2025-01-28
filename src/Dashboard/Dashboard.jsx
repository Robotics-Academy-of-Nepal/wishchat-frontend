import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/wishchat-logo.png'


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
             <div className="flex flex-col items-center justify-center gap-2">
             <button
          className="flex items-center justify-center border-gray-400 border-solid rounded-md shadow-xl shadow-black hover:scale-105 hover:shadow-black "
              onClick={() => navigate('/playground')}
          >
             <img  className="w-[250px] h-[250px] p-[20px]" src={logo} />
          </button>
          <p className="px-10 py-1 text-4xl font-bold"
               style={{ fontFamily: "Georgia" }}
              >
                  {companyName}
              </p>
          </div>
          
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
