import React, { useState, useEffect, useCallback, useRef } from "react";
import { IoSend, IoClose } from "react-icons/io5";
import { MdOutlineCleaningServices } from "react-icons/md";
import logo from "../assets/wishchat-logo.png";
import bot from "../assets/bot.png";
import user from "../assets/user.png";

import { debounce } from "lodash"; // Importing lodash debounce function

export default function Chatbot({ apikey }) {
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // Error state
  const messagesEndRef = useRef(null);

  const toggleChatbotVisibility = useCallback(() => {
    setIsChatbotVisible((prev) => !prev);
  }, []);

  const clearChat = () => {
    setMessages([]); // Clears the chat history
  };

  // Load chat history from localStorage
  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem("chatHistory"));
    if (savedMessages) {
      setMessages(savedMessages);
    }
  }, []);

  useEffect(() => {
    if (isChatbotVisible && messages.length === 0) {
      setMessages([
        {
          text: "Hi there! How can I help you today?",
          sender: "bot",
          isGreeting: true,
        },
      ]);
    }
  }, [isChatbotVisible, messages.length]);

  useEffect(() => {
    if (messages.length > 0) {
      setError(null); // Clear any previous error if messages are being updated
    }
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      // Prevent default behavior (new line) and send the message
      e.preventDefault();
      handleSendMessage();
    }
  };

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

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const botResponse = data.response;

        setMessages([...newMessages, { text: botResponse, sender: "bot" }]);
      } catch (error) {
        console.error("Error:", error.message);
        setError(error.message); // Set the error message
        setMessages([
          ...newMessages,
          { text: "Sorry, something went wrong. Please try again later.", sender: "bot" },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  }, [input, messages, isLoading, apikey]);

  // Using debounce to optimize API calls
  const debouncedHandleSendMessage = useCallback(
    debounce(async () => {
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

          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }

          const data = await response.json();
          const botResponse = data.response;

          setMessages([...newMessages, { text: botResponse, sender: "bot" }]);
        } catch (error) {
          console.error("Error:", error.message);
          setError(error.message); // Set the error message
          setMessages([
            ...newMessages,
            { text: "Sorry, something went wrong. Please try again later.", sender: "bot" },
          ]);
        } finally {
          setIsLoading(false);
        }
      }
    }, 500), // Adjust debounce time as needed (500ms is reasonable)
    [input, messages, isLoading, apikey]
  );

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

    // Remove unwanted references like [doc1]
    const cleanedText = text.replace(/\[doc1\]/g, "");

    return (
      <div className="whitespace-pre-line">
        {cleanedText.split("\n").map((line, index) => (
          <p key={index} className={line.startsWith("###") ? "font-bold text-lg" : ""}>
            {line.split(/(\*\*.*?\*\*)/g).map((part, i) =>
              part.startsWith("**") && part.endsWith("**") ? (
                <>
                  <br key={`br-${i}`} /> {/* Insert line break */}
                  <strong key={i}>{part.replace(/\*\*/g, "")}</strong>
                </>
              ) : (
                part
              )
            )}
          </p>
        ))}
      </div>
    );
  };

  // Save chat history to localStorage
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  return (
    <>
      <div className="relative" style={{ fontFamily: "Georgia" }}>
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
              <div className="flex items-center space-x-2">
                {/* Clear Chat Button */}
                <button
                  type="button"
                  className="p-2.5 text-white bg-green-400 rounded-full hover:bg-green-500"
                  onClick={clearChat}
                >
                 <MdOutlineCleaningServices />
                </button>
                {/* Close Button */}
                <button
                  type="button"
                  className="p-1 text-white bg-red-500 rounded-full"
                  onClick={() => setIsChatbotVisible(false)}
                >
                  <IoClose className="w-7 h-7" />
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-2 mx-3 my-2 text-sm text-red-700 bg-red-100 rounded-md">
                <strong>Error: </strong>{error}
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 p-3 space-y-3 overflow-y-auto">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-center ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.sender === "bot" && (
                    <img src={bot} alt="Bot" className="w-10 h-10 mr-2 rounded-full" />
                  )}
                  <div
                    className={`p-2 rounded-lg shadow-md ${message.sender === "user" ? "bg-blue-400 text-white" : "bg-gray-200 text-black"} max-w-[70%] break-words`}
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
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
              />
              <button
                type="button"
                disabled={isLoading}
                className={`p-3 rounded-full text-white shadow-lg ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:scale-105"}`}
                onClick={debouncedHandleSendMessage}
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
