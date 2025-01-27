import { useState } from 'react';
import Navbar from '../Components/Navbar/Navbar';

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

  // Utility function to make links clickable
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
          className="text-blue-500 underline"
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
      <div className="flex flex-col items-center justify-start px-6 pt-5 pb-8 bg-gray-100 min-h-auto">
        <div className="grid w-full max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2">
          {/* System Prompt Section */}
          <div className="flex flex-col items-start p-6 md:h-[300px] bg-white border border-gray-300 shadow-xl shadow-gray-500 rounded-xl">
            <h1 className="mb-4 text-xl font-semibold text-gray-800">System Prompt</h1>
            <textarea
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              placeholder="Enter system prompt here..."
              className="w-full h-40 p-4 mb-4 border-gray-500 border-solid rounded-lg shadow-sm resize-none border-1 focus:ring-2 focus:ring-blue-500 "
            ></textarea>
            <button
              onClick={handleApplySystemPrompt}
              className="w-full px-6 py-3 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Apply Changes
            </button>
          </div>

          {/* Chat Section */}
          <div className="flex flex-col h-[630px] bg-white border border-gray-300 rounded-xl shadow-xl shadow-gray-500">
            <div className="flex-1 p-4 space-y-4 overflow-y-auto rounded-t-lg bg-gray-50">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-lg p-4 rounded-lg shadow-md transition-transform transform  ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-900'
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

            <div className="flex items-center p-4 bg-white border-t border-gray-300 rounded-b-lg">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !isLoading) {
                    handleSendMessage();
                  }
                }}
                className="flex-1 p-3 border-2 border-gray-400 border-solid rounded-lg focus:outline-none "
                placeholder="Type a message..."
              />
              <button
                onClick={handleSendMessage}
                className="px-6 py-3 ml-4 text-white bg-blue-600 rounded-lg shadow-md shadow-black hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
