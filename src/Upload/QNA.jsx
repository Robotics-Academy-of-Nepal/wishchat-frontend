import React, { useState, useEffect } from 'react';

export default function QNA() {
  const [qnaList, setQnaList] = useState([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newQnas, setNewQnas] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error handling

  const SERVER_URL = 'https://wishchat.goodwish.com.np/api/upload/'; // Replace with your server URL

  // Fetch Q&A from server when component mounts
  useEffect(() => {
    const fetchQnaFromServer = async () => {
      setLoading(true);
      try {
        const response = await fetch(SERVER_URL);
        const data = await response.json();
        setQnaList(data);
      } catch (error) {
        console.error('Error fetching Q&A:', error);
        setError('Failed to load Q&A data.');
      } finally {
        setLoading(false);
      }
    };

    fetchQnaFromServer();
  }, []);

  // Handle adding a new Q&A pair to newQnas list
  const handleAddQna = () => {
    if (question.trim() && answer.trim()) {
      const newQna = { question, answer };
      setNewQnas((prevList) => [...prevList, newQna]);
      setQuestion('');
      setAnswer('');
    } else {
      alert('Both question and answer are required.');
    }
  };

  // Handle submitting all new Q&A pairs to the backend
  const handleSubmitQnas = async () => {
    if (newQnas.length === 0) {
      alert('No new Q&As to submit.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(SERVER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newQnas),
      });

      if (response.ok) {
        setQnaList((prevList) => [...prevList, ...newQnas]);
        setNewQnas([]);
        setShowAddForm(false);
      } else {
        console.error('Failed to submit Q&As');
        setError('Failed to submit new Q&A pairs.');
      }
    } catch (error) {
      console.error('Error submitting Q&As:', error);
      setError('An error occurred while submitting Q&A data.');
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting a Q&A
  const handleDeleteQna = async (index) => {
    const updatedList = [...qnaList];
    updatedList.splice(index, 1);
    setQnaList(updatedList);
    // Optional: Send delete request to server if required
  };

  return (
    <div className="max-w-4xl min-h-screen p-8 mx-auto font-sans bg-gray-50">
      <h1 className="mb-6 text-3xl font-bold text-center text-gray-900">Interactive Q&A</h1>

      {/* Toggle Form Button */}
      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="px-6 py-3 mb-6 text-white transition bg-indigo-600 rounded-md cursor-pointer hover:bg-indigo-700"
      >
        {showAddForm ? 'Cancel' : 'Add a New Q&A'}
      </button>

      {/* Add Form */}
      {showAddForm && (
        <div className="p-6 mb-6 bg-white border-2 border-black rounded-md shadow-lg">
          <h3 className="mb-4 text-xl font-semibold text-gray-900">Add a Q&A Pair</h3>
          <label className="block mb-2 text-gray-800">Question:</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your question"
            className="w-full p-3 mb-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <label className="block mb-2 text-gray-800">Answer:</label>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter the answer"
            className="w-full p-3 mb-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            onClick={handleAddQna}
            className="w-full px-6 py-3 text-white transition bg-green-500 rounded-md cursor-pointer hover:bg-green-600"
          >
            Add Q&A
          </button>
        </div>
      )}

      {/* Newly Added Q&A */}
      {newQnas.length > 0 && (
        <div className="p-6 mb-6 bg-white border-2 rounded-md border-slate-500">
          <h3 className="mb-4 text-xl font-semibold text-gray-900">New Q&A Pairs</h3>
          <ul className="space-y-4">
            {newQnas.map((qna, index) => (
              <li key={index}>
                <p className="font-semibold text-gray-800">Question: {qna.question}</p>
                <p className="text-gray-700">Answer: {qna.answer}</p>
              </li>
            ))}
          </ul>
          <button
            onClick={handleSubmitQnas}
            className="px-6 py-3 mt-4 text-white transition bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Submit All
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && <p className="mb-6 text-red-500">{error}</p>}

      {/* Q&A List */}
      <div className="p-6 mb-6 bg-white border-2 border-gray-300 rounded-lg shadow-xl">
        <h3 className="mb-6 text-2xl font-semibold text-gray-900">Q&A List</h3>
        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : qnaList.length > 0 ? (
          <ul className="space-y-6">
            {qnaList.map((qna, index) => (
              <li key={index} className="flex items-start justify-between pb-4 border-b">
                <div className="w-full">
                  <p className="font-semibold text-gray-800">Question: {qna.question}</p>
                  <p className="text-gray-700">Answer: {qna.answer}</p>
                </div>
                <button
                  onClick={() => handleDeleteQna(index)}
                  className="px-4 py-2 text-white transition duration-200 bg-red-500 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No Q&A pairs available.</p>
        )}
      </div>
    </div>
  );
}
