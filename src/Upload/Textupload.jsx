import React, { useState } from 'react';

export default function TextUpload() {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [message, setMessage] = useState(''); // Feedback message

  const handleSubmit = async () => {
    // Validate input
    if (!text.trim()) {
      setMessage('Please enter some text before submitting.');
      return;
    }

    // Create a blob from the text
    const blob = new Blob([text], { type: 'text/plain' });
    const formData = new FormData();
    formData.append('file', blob, 'message.txt');

    try {
      setIsLoading(true); // Show loading indicator
      setMessage(''); // Clear any previous messages

      const response = await fetch('https://wishchat.goodwish.com.np/api/upload/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMessage('✅ Text file uploaded successfully!');
      } else {
        setMessage('❌ Failed to upload the text file.');
      }
    } catch (error) {
      console.error('Error uploading the file:', error);
      setMessage('⚠️ An error occurred while uploading the file.');
    } finally {
      setIsLoading(false); // Hide loading indicator
      setText(''); // Clear the textarea
    }
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-lg p-8 mx-auto bg-gray-100 shadow-lg rounded-xl">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">Text Upload</h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="6"
        className="w-full p-4 mb-6 text-lg border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="Enter your message here..."
      />

      <button
        onClick={handleSubmit}
        className={`bg-green-500 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 ${
          isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'
        }`}
        disabled={isLoading}
      >
        {isLoading ? 'Uploading...' : 'Upload'}
      </button>

      {/* Feedback Message */}
      {message && (
        <p className={`mt-4 text-sm ${message.includes('✅') ? 'text-green-600' : 'text-red-500'}`}>
          {message}
        </p>
      )}
    </div>
  );
}
