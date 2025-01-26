import React, { useState, useEffect, useCallback, useRef } from "react";
import { IoSend } from "react-icons/io5";
import logo from '../assets/wishchat-logo.png';
import { IoClose } from "react-icons/io5";

import bot from '../assets/bot.png'
import user from '../assets/user.png'

export default function Chatbot({apikey}) {
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChatbotVisibility = useCallback(() => {
    setIsChatbotVisible((prev) => !prev);
  }, []);

  useEffect(() => {
    if (isChatbotVisible && messages.length === 0) {
      setMessages([{ text: "Hi there! How can I help you today?", sender: "bot" }]);
    }
  }, [isChatbotVisible, messages.length]);

  useEffect(() => {
   
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = useCallback(async () => {
    if (input.trim() && !isLoading) {
      setIsLoading(true);
      const newMessages = [...messages, { text: input, sender: "user" }];
      setMessages(newMessages);
      setInput("");
  
 
      const typingMessage = { text: "Typing...", sender: "bot", isTyping: true };
      setMessages([...newMessages, typingMessage]);
  
      try {
        const response = await fetch(
          process.env.REACT_APP_CHATBOT_API_URL || "url",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
               query: input,
               apiKey: apiKey 

             }),
          }
        );
  
        const data = await response.json();
        let botResponse = data.response;
  
    

        setMessages([
          ...newMessages,
          { text: botResponse, sender: "bot" },
        ]);
      } catch (error) {
        console.error("Error:", error);
        setMessages([
          ...newMessages,
          { text: "Sorry, I couldn't connect to the server.", sender: "bot" },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  }, [input, messages, isLoading]);

  const renderMessageText = (text, isTyping) => {
    if (isTyping) {
      return (
        <span className="typing-dots">
          <span className="dot">.</span>
          <span className="dot">.</span>
          <span className="dot">.</span>
        </span>
      );
    }

    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, index) =>
      urlRegex.test(part) ? (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
        >
          {part}
        </a>
      ) : (
        part
      )
    );
  };

 

  return (
    <>
      <div className="fixed z-50 flex flex-col items-center space-y-1 bottom-4 right-4 md:bottom-6 md:right-6 lg:bottom-8 lg:right-8">
    
        <button
          type="button"
          className="p-3 text-xs text-white transition-transform transform bg-blue-500 rounded-full shadow-xl md:text-sm lg:text-base md:p-4 lg:p-4 hover:scale-105"
          onClick={toggleChatbotVisibility}
        >
          <span className="text-2xl font-bold"    style={{ fontFamily: "Georgia" }}>
          💬
          </span>
      
        </button>
        {/* <p    style={{ fontFamily: "Georgia" }}>Power by GoodWish</p> */}
      </div>

      {isChatbotVisible && (
        <div
             style={{ fontFamily: "Georgia" }}
          className="fixed bottom-4 right-1 md:bottom-6 md:right-6 lg:bottom-8 lg:right-4 z-50 w-[85%] max-w-lg md:w-[300px] lg:w-[350px] h-[500px] md:h-[500px] lg:h-[550px] xl:h-[550px] xl:w-[420px] bg-white  rounded-3xl shadow-xl flex flex-col transform transition-all duration-300 ease-in-out shadow-3xl shadow-blue-300"
        >
      
          <div className="flex items-center  justify-between h-16 md:h-[55px] p-3 bg-blue-500 rounded-t-lg shadow-md  ">
           <h1></h1>
      
            <h1 className="p-0 text-lg font-bold text-white md:text-lg lg:text-xl">Chat Bot </h1>
            
            <button
              type="button"
              className="p-1 text-white bg-red-500 rounded-full "
              onClick={() => setIsChatbotVisible(false)}
            >
        <IoClose className="w-7 h-7" />

            </button>
    
           
      
          </div>
    


          <div className="flex-1 p-3 my-2 space-y-3 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-center ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.sender === "bot" && (
                  <div className="flex flex-col items-center font-semibold text-center">
                    <img
                      src={bot}
                      alt="Bot Icon"
                      className="w-10 h-10 mr-2 border-blue-500 border-solid rounded-full border-1"
                    />
                    <p className="text-[13px]">Chat<br/> Bot</p>
                  </div>
                )}
                <div
                  className={`p-2 my-2 rounded-lg shadow-md transition-transform duration-200 ${
                    message.sender === "user"
                      ? "bg-blue-400 text-gray-200 shadow-3xl shadow-blue-300"
                      : "bg-white text-black shadow-3xl shadow-black"
                  } max-w-[80%] md:max-w-[70%] lg:max-w-[60%] text-xs md:text-sm lg:text-sm break-words`}
                >
                  {renderMessageText(message.text, message.isTyping)}
                </div>

                {message.sender === "user" && (
                  <div className="flex flex-col items-center p-0 text-center">
                    <img
                      src={user}
                      alt="User Icon"
                      className="w-10 h-10 rounded-full"
                    />
                    <p className="text-[13px]">
                       User
                    </p>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex-col items-center p-4 bg-white rounded-lg shadow-md">
  <div className="flex items-center w-full space-x-2">
    <input
      type="text"
      className="flex-grow w-full md:w-[350px] p-3 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          handleSendMessage();
        }
      }}
      placeholder="Type your message..."
    />
    <button
      type="button"
      disabled={isLoading}
      className={`p-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full shadow-lg transition-transform duration-200 ease-in-out ${
        isLoading
          ? "bg-gray-400 cursor-not-allowed "
          : "hover:scale-105"
      }`}
      onClick={handleSendMessage}
    >
      <IoSend className="shadow-xl shadow-black" />
    </button>
  </div>

  <div className="flex items-center justify-center gap-2 mt-3 text-center">
  <div className="flex items-center justify-center gap-2 text-center text-black bg-white shadow-3xl shadow-black">
    <h1 className="font-serif text-lg text-gray-700">Powered By</h1>
    <img src={logo} className="h-[40px] w-[40px] rounded-full shadow-md" />
    </div>
  </div>
</div>

        </div>
      )}

      
      <style jsx>{`
       .typing-dots {
  display: flex;
  justify-content: center; 
  align-items: center; 
  height: 100%; 
}

.dot {
  font-size: 2rem;
  margin: 0 2px;
  animation: blink 2s infinite; 
}

.dot:nth-child(2) {
  animation-delay: 0.4s; 
}

.dot:nth-child(3) {
  animation-delay: 0.8s; 
}

@keyframes blink {
  0%, 33% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}


      `}</style>
    </>
  );
}