import { useState } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import { GiLargePaintBrush } from "react-icons/gi";

export default function Playground() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    const token = localStorage.getItem('token');

    if (input.trim()) {
      const userMessage = { text: input, sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput('');

      try {
        setIsLoading(true);
        const response = await fetch('https://wishchat.goodwish.com.np/api/query/', {
          method: 'POST',
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: input }),
        });

        const data = await response.json();
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: data.response, sender: 'bot' },
        ]);
      } catch (error) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Error fetching response. Please try again.', sender: 'bot' },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  const handleApplySystemPrompt = async () => {
    const token = localStorage.getItem('token');
    if (systemPrompt.trim()) {
      try {
        const response = await fetch('https://wishchat.goodwish.com.np/api/apply-changes/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
          },
          body: JSON.stringify({ prompt: systemPrompt }),
        });

        const data = await response.json();
        alert(data.message || 'System prompt updated successfully!');
      } catch (error) {
        alert('Error updating system prompt. Please try again.');
      }
    }
  };

  const renderMessageText = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, index) =>
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
      <Navbar />
      <div      style={{ fontFamily: "Georgia" }} className="flex flex-col items-center justify-start min-h-screen px-4 pt-3 pb-8 bg-gray-50">
        <div className="grid w-full max-w-full grid-cols-12 gap-6">
          {/* System Prompt Section */}
          <div className="flex flex-col items-start h-full col-span-12 p-6 transition-shadow bg-white border border-gray-200 shadow-xl shadow-black lg:col-span-3 rounded-xl hover:shadow-xl hover:shadow-black">
            <h1 className="mb-4 text-2xl font-semibold text-gray-800">
              System Prompt
            </h1>
            <textarea
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              placeholder="Enter system prompt here..."
              className="w-full h-40 p-4 mb-4 text-gray-700 border-gray-500 rounded-lg shadow-sm resize-none border-1 focus:shadow-black focus:shadow-xl"
            ></textarea>
            <button
              onClick={handleApplySystemPrompt}
              className="w-full px-4 py-3 text-lg font-medium text-white transition-all bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Apply Changes
            </button>
          </div>

          {/* Chat Section */}
          <div className="shadow-black shadow-xl col-span-12 lg:col-span-9 flex flex-col h-[calc(100vh-150px)] bg-white border border-gray-200 rounded-xl  hover:shadow-xl hover:shadow-black transition-shadow">
            {/* Chat Header */}
            <div className="flex items-center justify-end px-4 py-3 bg-gray-100 border-b border-gray-200 rounded-t-lg">
              <button
                onClick={handleClearChat}
                className="px-2 py-2 text-sm font-medium text-white transition-all bg-red-600 rounded-full shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <GiLargePaintBrush />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-lg p-4 rounded-lg shadow-md transition-all ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white'
                        : 'bg-gradient-to-r from-gray-200 to-gray-100 text-gray-800'
                    }`}
                  >
                    {renderMessageText(msg.text)}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="text-gray-500 animate-pulse">Bot is typing...</div>
              )}
            </div>

            {/* Chat Input */}
            <div className="flex items-center p-4 bg-white border-t border-gray-200 rounded-b-lg">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !isLoading) {
                    handleSendMessage();
                  }
                }}
                className="flex-1 px-4 py-2 text-sm border-gray-500 rounded-lg shadow-sm border-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type a message..."
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 ml-3 text-sm font-medium text-white transition-all bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
