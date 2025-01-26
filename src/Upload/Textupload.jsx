import React, { useState } from 'react';

export default function TextUpload() {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [message, setMessage] = useState(''); // Feedback message

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');

    // Validate input
    if (!text.trim()) {
      setMessage('❌ Please enter some text before submitting.');
      return;
    }

    // Create a blob from the text
    const blob = new Blob([text], { type: 'text/plain' });
    const filename = `message_${Date.now()}.txt`;

    const formData = new FormData();
    formData.append('file', blob, filename); // Specify filename explicitly
    formData.append('filename', filename);

    try {
      setIsLoading(true); // Show loading indicator
      setMessage(''); // Clear any previous messages

      const response = await fetch('http://192.168.1.38:8000/api/upload/', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Token ${token}`, // Include the token for authentication
        },
      });

      if (response.ok) {
        setMessage('✅ Text file uploaded successfully!');
        localStorage.setItem('has_active_chatbot', JSON.stringify(true));
        localStorage.setItem('filename', filename);
      } else {
        const errorData = await response.json();
        setMessage(`❌ Failed to upload: ${errorData.message || 'Server error'}`);
      }
    } catch (error) {
      console.error('Error uploading the file:', error);
      setMessage('⚠️ An error occurred while uploading the file. Please try again.');
    } finally {
      setIsLoading(false); // Hide loading indicator
      setText(''); // Clear the textarea
    }
  };

  const file= localStorage.getItem('filename');

  return (
    <div className="flex flex-col items-center justify-center max-w-lg p-8 mx-auto bg-gray-100 shadow-lg rounded-xl">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">Text Upload</h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="6"
        disabled={file}
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
