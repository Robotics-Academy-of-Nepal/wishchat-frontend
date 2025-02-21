import React, { useState, useEffect, useCallback, useRef } from "react";
import { IoSend, IoClose } from "react-icons/io5";
import logo from "../assets/wishchat-logo.png";
import bot from "../assets/bot.png";
import user from "../assets/user.png";

export default function Chatbot({ apikey }) {
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
        const response = await fetch(" http://192.168.1.29:8000/api/chat/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: input,
            apiKey: apikey,
          }),
        });

        const data = await response.json();
        const botResponse = data.response;

        setMessages([...newMessages, { text: botResponse, sender: "bot" }]);
      } catch (error) {
        console.error("Error:", error.message);
        setMessages([
          ...newMessages,
          { text: "Sorry, I couldn't connect to the server.", sender: "bot" },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  }, [input, messages, isLoading, apikey]);

  console.log(apikey);

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
      <div className="relative "     style={{ fontFamily: "Georgia" }}>
        {/* Chat Bubble */}
        <div className="fixed z-50 flex flex-col items-center bottom-4 right-4 md:bottom-6 md:right-6">
          <button
            type="button"
            className="p-3 text-xs text-white transition-transform bg-blue-500 rounded-full shadow-xl hover:scale-105"
            onClick={toggleChatbotVisibility}
          >
            <span className="text-2xl font-bold" style={{ fontFamily: "Georgia" }}>
              💬
            </span>
          </button>
        </div>

        {/* Chat Window */}
        {isChatbotVisible && (
          <div className="fixed bottom-4 right-4 z-50 w-[85%] max-w-lg md:w-[350px] lg:w-[400px] h-[500px] bg-white rounded-3xl shadow-xl flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between h-16 p-3 bg-blue-500 rounded-t-lg">
              <h1 className="text-lg font-bold text-white">Chat Bot</h1>
              <button
                type="button"
                className="p-1 text-white bg-red-500 rounded-full"
                onClick={() => setIsChatbotVisible(false)}
              >
                <IoClose className="w-7 h-7" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-3 space-y-3 overflow-y-auto">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.sender === "bot" && (
                    <img src={bot} alt="Bot" className="w-10 h-10 mr-2 rounded-full" />
                  )}
                  <div
                    className={`p-2 rounded-lg shadow-md ${
                      message.sender === "user"
                        ? "bg-blue-400 text-white"
                        : "bg-gray-200 text-black"
                    } max-w-[70%] break-words`}
                  >
                    {renderMessageText(message.text, message.isTyping)}
                  </div>
                  {message.sender === "user" && (
                    <img src={user} alt="User" className="w-10 h-10 ml-2 rounded-full" />
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex items-center p-3 space-x-2 bg-gray-100">
              <input
                type="text"
                className="flex-grow p-3 text-sm border-2 border-gray-300 rounded-lg"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your message..."
              />
              <button
                type="button"
                disabled={isLoading}
                className={`p-3 rounded-full text-white shadow-lg ${
                  isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:scale-105"
                }`}
                onClick={handleSendMessage}
              >
                <IoSend />
              </button>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-center p-2 bg-gray-200">
              <h1 className="text-sm text-gray-600">Powered by</h1>
              <img src={logo} alt="Logo" className="w-8 h-8 ml-2 rounded-full" />
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        .typing-dots {
          display: flex;
          align-items: center;
        }
        .dot {
          font-size: 1.5rem;
          margin: 0 2px;
          animation: blink 1.4s infinite;
        }
        .dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        .dot:nth-child(3) {
          animation-delay: 0.4s;
        }
        @keyframes blink {
          0%, 100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
