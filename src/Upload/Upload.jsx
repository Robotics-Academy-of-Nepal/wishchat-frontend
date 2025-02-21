import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Navbar from '../Components/Navbar/Navbar';
import QNA from './QNA';
import TextUpload from './Textupload';
import Uploaded from './Uploted';
import MainQuestion from './MainQuestion';

const Upload = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('uploadFiles');
  const [trainedFiles, setTrainedFiles] = useState([]);
  const [isTraining, setIsTraining] = useState(false);
  const [progress, setProgress] = useState(0);
  const [existingFilesCount, setExistingFilesCount] = useState(0);

  // Fetch existing documents
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }
  
        const response = await fetch('http://192.168.1.29:8000/api/documents/', {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`,  // Added Token Authentication
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setExistingFilesCount(data.total_count);
        } else {
          console.error('Failed to fetch documents:', response.status);
        }
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };
  
    fetchDocuments();
  }, []);
  

  // Handle multiple file uploads
  const handleFileUpload = (event) => {
    if (existingFilesCount >= 3) return; // Prevent file selection if limit is reached

    const files = Array.from(event.target.files).slice(0, 3); // Limit to 3 files
    const newFiles = files.map((file) => ({
      file,
      name: file.name,
      date: new Date().toISOString().split('T')[0],
    }));

    setTrainedFiles((prevFiles) => [...prevFiles, ...newFiles].slice(0, 3)); // Ensure max 3 files
  };

  // Remove selected file
  const handleDeselectFile = (index) => {
    setTrainedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  // Simulate training progress
  const simulateProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 200);
    return interval;
  };

  const handleTrainChatbot = async () => {
    if (trainedFiles.length === 0) return;
  
    try {
      setIsTraining(true);
      const progressInterval = simulateProgress();
  
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');
  
      const formData = new FormData();
  
      trainedFiles.forEach((fileObj, index) => {
        const filenameWithoutExt = fileObj.name.replace(/\.[^/.]+$/, ""); // Remove file extension
        formData.append(`file${index + 1}`, fileObj.file); 
        formData.append(`filename${index + 1}`, filenameWithoutExt); 
      });
  
      const response = await fetch('http://192.168.1.29:8000/api/upload/', {
        method: 'POST',
        headers: { Authorization: `Token ${token}` },
        body: formData,
      });
  
      if (response.ok) {
        localStorage.setItem('has_active_chatbot', JSON.stringify(true));
        navigate('/playground');
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      clearInterval(progressInterval);
      setProgress(100);
      setTimeout(() => {
        setIsTraining(false);
        setProgress(0);
      }, 1000);
    } catch (error) {
      console.error('Error uploading files:', error);
      setIsTraining(false);
      setProgress(0);
    }
  };
  
  return (
    <div style={{ fontFamily: 'Georgia' }}>
      <Navbar />
      <div className="flex items-center justify-center gap-1">
        <p className="text-black">Note:</p>
        <p className="text-red-500">You can upload up to three files at once.</p>
      </div>

      <div className="flex flex-col min-h-screen bg-gray-100 md:flex-row">
        {/* Sidebar */}
        <div className="w-full bg-white shadow-lg md:w-64">
          <ul className="flex justify-around p-4 space-y-2 md:flex-col md:justify-start">
            {['uploadFiles', 'qna', 'textUpload', 'uploaded', 'mainquestion'].map((section) => (
              <li
                key={section}
                className={`cursor-pointer p-3 rounded-lg text-center text-lg ${
                  activeSection === section ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveSection(section)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </li>
            ))}
          </ul>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-4">
          {activeSection === 'uploadFiles' && (
            <div className="flex flex-col items-center">
              <label
                htmlFor="file-upload"
                className={`flex flex-col items-center justify-center w-full max-w-lg p-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ${
                  existingFilesCount >= 3 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <Plus className="w-8 h-8 text-blue-500" />
                <p className="mt-2 text-center text-gray-600">
                  Click to upload files (Max 3)<br />
                  (PDF, DOC, DOCX, or TXT)
                </p>
              </label>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.txt"
                multiple
                onChange={handleFileUpload}
                disabled={existingFilesCount >= 3}
              />

              {/* Display uploaded files */}
              <div className="mt-4">
                {trainedFiles.length > 0 && (
                  <ul>
                    {trainedFiles.map((file, index) => (
                      <li key={index} className="flex items-center justify-between w-full max-w-md p-2 bg-white rounded-lg shadow-md">
                        <span>{file.name}</span>
                        <button 
                          className="px-2 py-1 ml-2 text-sm text-white bg-red-500 rounded" 
                          onClick={() => handleDeselectFile(index)}
                        >
                          Deselect
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <button
                className={`px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 ${
                  trainedFiles.length === 0 || isTraining || existingFilesCount >= 3 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={handleTrainChatbot}
                disabled={trainedFiles.length === 0 || isTraining || existingFilesCount >= 3}
              >
                {isTraining ? 'Training in Progress...' : 'Train Chatbot'}
              </button>

              {isTraining && (
                <div className="w-full max-w-lg mt-4">
                  <div className="relative h-4 bg-gray-200 rounded">
                    <div
                      className="absolute top-0 left-0 h-4 bg-blue-500 rounded"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="mt-2 text-center text-gray-700">Training Progress: {progress}%</p>
                </div>
              )}
            </div>
          )}

          {activeSection === 'qna' && <QNA />}
          {activeSection === 'textUpload' && <TextUpload />}
          {activeSection === 'uploaded' && <Uploaded />}
          {activeSection === 'mainquestion' && <MainQuestion />}
        </div>
      </div>
    </div>
  );
};

export default Upload;
