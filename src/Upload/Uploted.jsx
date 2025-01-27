import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, FileIcon, Trash2 } from 'lucide-react';
import Navbar from '../Components/Navbar/Navbar';
import QNA from './QNA';
import TextUpload from './Textupload';
import styles from './upload.module.css';

const Uploaded = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('uploadFiles');
  const [trainedFiles, setTrainedFiles] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isTraining, setIsTraining] = useState(false);
  const [progress, setProgress] = useState(0);
  const [existingFile, setExistingFile] = useState(localStorage.getItem('filename') || null);
  const [showConfirmMessage, setShowConfirmMessage] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false)

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
          window.location.reload();
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

  const file = localStorage.getItem('filename');
  console.log(file); 
  return (
    <div>
    
    {(uploadedFile || existingFile) ? (
  <div className='flex items-center justify-center md:h-[500px]'style={{ fontFamily: "Georgia" }}>
    <div className="p-6 mt-6 transition-shadow duration-300 ease-in-out bg-white rounded-lg shadow-md shadow-black hover:shadow-lg hover:shadow-black">
      <p className="font-medium text-gray-800">
        {existingFile ? (
          <div className='flex items-center justify-center gap-[100px] text-3xl'>
            <span>
              <span className="text-gray-600"    style={{ cursor: "not-allowed", padding: "20px", backgroundColor: "#f0f0f0" }}>Uploaded File: </span>
              <span className="font-semibold text-gray-900">{existingFile}</span>
            </span>
            <Trash2
              className="ml-2 text-red-500 transition-colors duration-200 ease-in-out cursor-pointer hover:text-red-600"
              onClick={handleDeleteExistingFile}
            />
    
          </div>
        ) : (
          <>
          </>
        )}
      </p>
    </div>
  </div>
) : (
<div className='flex items-center justify-center text-center md:h-[600px]'>
  <p className="p-2 text-xl text-black bg-white rounded-[10px] shadow-md shadow-black" style={{ fontFamily: "Georgia" }}>
    No file uploaded yet
  </p>
</div>


 
)}

    </div>
  )
}

export default Uploaded;
