import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, FileIcon, Trash2 } from 'lucide-react';
import Navbar from '../Components/Navbar/Navbar';
import QNA from './QNA';
import TextUpload from './Textupload';
import Uploaded from './Uploted';
import styles from './upload.module.css';
import MainQuestion from './MainQuestion';

const Upload = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('uploadFiles');
  const [trainedFiles, setTrainedFiles] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isTraining, setIsTraining] = useState(false);
  const [progress, setProgress] = useState(0);
  const [existingFile, setExistingFile] = useState(localStorage.getItem('filename') || null);

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileData = {
        file,
        name: file.name,
        date: new Date().toISOString().split('T')[0],
      };
      setUploadedFile(fileData);
      setTrainedFiles([fileData]);
    }
  };

  // Handle file deletion
  const handleDeleteExistingFile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://wishchat.goodwish.com.np/api/delete/', {
        method: 'DELETE',
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (response.status === 204) {
        localStorage.setItem('has_active_chatbot', JSON.stringify(false));
        localStorage.setItem('filename', '');
        setExistingFile(null);
        setTrainedFiles([]);
        setUploadedFile(null);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  // Simulate the training progress
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

  // Handle training the chatbot
  const handleTrainChatbot = async () => {
    if (existingFile) return;

    try {
      setIsTraining(true);
      const progressInterval = simulateProgress();

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const formData = new FormData();
      trainedFiles.forEach((fileObj) => {
        formData.append('file', fileObj.file);
        formData.append('filename', fileObj.name);
      });

      const response = await fetch('https://wishchat.goodwish.com.np/api/upload/', {
        method: 'POST',
        headers: {
          Authorization: `Token ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const uploadedFilename = trainedFiles[0]?.name || null;
        if (uploadedFilename) {
          localStorage.setItem('filename', uploadedFilename);
        }
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
    <div    style={{ fontFamily: "Georgia" }}>
      <Navbar />
      <div className='flex items-center justify-center gap-1'>
      <p className='text-black '>Note:</p>
        <p className='text-red-500 '>You can upload only one file at a time. If you need to add another file, you must delete the uploaded file first.</p>
      </div>
      
      <div className="flex flex-col min-h-screen bg-gray-100 md:flex-row">
        {/* Sidebar */}
        <div className="w-full bg-white shadow-lg md:w-64">
          <ul className="flex justify-around p-4 space-y-2 md:flex-col md:justify-start">
            <li
              className={`cursor-pointer p-3 rounded-lg text-center text-lg ${activeSection === 'uploadFiles' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setActiveSection('uploadFiles')}
            >
              Upload Files
            </li>
            <li
              className={`cursor-pointer p-3 rounded-lg text-center text-lg ${activeSection === 'qna' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setActiveSection('qna')}
            >
              Q&A
            </li>
            <li
              className={`cursor-pointer p-3 rounded-lg text-center text-lg ${activeSection === 'textUpload' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setActiveSection('textUpload')}
            >
              Text
            </li>
            <li
              className={`cursor-pointer p-3 rounded-lg text-center text-lg ${activeSection === 'uploaded' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setActiveSection('uploaded')}
            >
              uploaded
            </li>
            <li
              className={`cursor-pointer p-3 rounded-lg text-center text-lg ${activeSection === 'mainquestion' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setActiveSection('mainquestion')}
            >
              Main Question
            </li>
          </ul>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-4">
          {activeSection === 'uploadFiles' && (
            <div className="flex flex-col items-center">
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full max-w-lg p-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <Plus className="w-8 h-8 text-blue-500" />
                <p className="mt-2 text-center text-gray-600">
                  Click to upload files<br />
                  (PDF, DOC, DOCX, or TXT)
                </p>
              </label>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileUpload}
                disabled={existingFile}
              />
              {/* Display Uploaded File or Existing File */}
              {(uploadedFile || existingFile) && (
                <div className="p-4 mt-4 bg-white rounded-lg shadow-md">
                  <p className="text-gray-700">
                    {existingFile ? (
                      <>
                      
                      </>
                    ) : (
                      <>
                        Uploaded: <span className="font-medium">{uploadedFile.name}</span>
                      </>
                    )}
                  </p>
                </div>
              )}
              <button
                className={`px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 ${
                  !existingFile ? '' : 'cursor-not-allowed'
                  
                }`}
                title={ existingFile ? 'First delete the uploaded file to upload' : ''}
             
                onClick={handleTrainChatbot}
                disabled={existingFile || trainedFiles.length === 0 || isTraining}
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
          {activeSection === 'uploaded'&& <Uploaded />}
          {activeSection === 'mainquestion'&& <MainQuestion />}
        </div>
      </div>
    </div>
  );
};

export default Upload;
