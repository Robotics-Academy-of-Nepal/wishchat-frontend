import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function QNA() {
  const [qnaList, setQnaList] = useState([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newQnas, setNewQnas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] =useState('');
  
  const SERVER_URL = 'http://192.168.1.38:8000/api/upload/'; // Replace with your server URL
  const token = localStorage.getItem('token');
  const navigate = useNavigate(); // Initialize the navigate function

 

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

  const handleSubmitQnas = async () => {
    if (newQnas.length === 0) {
      alert('No new Q&As to submit.');
      return;
    }

    setLoading(true);
    try {
      // Convert the QNA array to a formatted string
      const qnaText = newQnas
        .map((qna, index) => `Q${index + 1}: ${qna.question}\nA${index + 1}: ${qna.answer}\n`)
        .join('\n');

      // Create a Blob for the .txt file
      const blob = new Blob([qnaText], { type: 'text/plain' });

      // The filename that you want to send
      const generateRandomFilename = () => {
        const randomNumber = Math.floor(Math.random() * 90000) + 10000; // Generates a random number between 10000 and 99999
        return `QNA${randomNumber}.txt`;
      };

      const filename = generateRandomFilename();

      // Use FormData to send the file and the filename
      const formData = new FormData();
      formData.append('file', blob, filename); // Attach the file with the filename
      formData.append('filename', filename); // Send the filename as a separate variable

      const response = await fetch(SERVER_URL, {
        method: 'POST',
        headers: {
          Authorization: `Token ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        // Assuming the server returns the file URL or content in the response
        const data = await response.json();
        const uploadedFileUrl = data.fileUrl; // Assuming the server returns a file URL

        setQnaList((prevList) => [...prevList, ...newQnas]);
        setNewQnas([]);
        setShowAddForm(false);
        localStorage.setItem('has_active_chatbot', JSON.stringify(true));
        localStorage.setItem('filename', filename);
        navigate('/playground'); // Use navigate to redirect

        // Optionally store the file URL or content
        setQnaList((prevList) => [
          ...prevList,
          { question: 'File Uploaded', answer: uploadedFileUrl },
        ]);
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

  const handleDeleteQna = async (index) => {
    const updatedList = [...qnaList];
    updatedList.splice(index, 1);
    setQnaList(updatedList);
  };
const file = localStorage.getItem("filename");

const handleadd = () =>{
  setShowAddForm(!showAddForm)
  if(file){
setMessage("You can Upload only one file at one time");
  }
}


  return (
    <div className="max-w-4xl min-h-screen p-8 mx-auto font-sans bg-gray-50"    style={{ fontFamily: "Georgia" }}>
      <h1 className="mb-6 text-3xl font-bold text-center text-gray-900">Interactive Q&A</h1>

      <button
        onClick={handleadd}
        disabled={file}
       
        className="px-6 py-3 mb-6 text-white transition bg-indigo-600 rounded-md cursor-pointer hover:bg-indigo-700"
      >
        {showAddForm ? 'Cancel' : 'Add a New Q&A'}
      </button>
      <p className='text-black'>{message}</p>

      {showAddForm && (
        <div className="p-6 mb-6 bg-white border-2 border-black rounded-md shadow-lg">
          <h3 className="mb-4 text-xl font-semibold text-gray-900" >Add a Q&A Pair</h3>

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

      {error && <p className="mb-6 text-red-500">{error}</p>}

    </div>
  );
}
