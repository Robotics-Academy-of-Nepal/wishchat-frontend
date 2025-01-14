import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, FileIcon, Trash2, X } from 'lucide-react';
import styles from './upload.module.css';
import goodwishLogo from '../assets/wishchat-logo.png';

const Upload = () => {
  const navigate = useNavigate();
  const [trainedFiles, setTrainedFiles] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isTraining, setIsTraining] = useState(false);
  const [progress, setProgress] = useState(0);
  const [existingFile, setExistingFile] = useState(localStorage.getItem("filename") || null);

  const pic = localStorage.getItem("Picture");

  const handleDeleteExistingFile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://wishchat.goodwish.com.np/api/delete/', {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${token}`,
        }
      });

      if (response.status === 204) {
        localStorage.setItem("has_active_chatbot", JSON.stringify(false));
        localStorage.setItem("filename","");
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

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile({
        file: file,
        name: file.name,
        date: new Date().toISOString().split('T')[0]
      });
      
      setTrainedFiles([{
        file: file,
        name: file.name,
        date: new Date().toISOString().split('T')[0]
      }]);
    }
  };

  const simulateProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
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
          'Authorization': `Token ${token}`,
        },
        body: formData
      });

      if (response.status === 200) {
        const uploadedFilename = trainedFiles[0]?.name || null; // Get the first file's name
        if (uploadedFilename) {
          localStorage.setItem("filename", uploadedFilename);
        }

        localStorage.setItem("has_active_chatbot", JSON.stringify(true));
        console.log("Uploaded filename stored in localStorage:", uploadedFilename);

        navigate('/playground');


      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
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
    <>
      {/* Navigation section remains the same */}
      <img className={styles.logo} src={goodwishLogo} alt="Logo image" onClick={() => navigate('/home')} style={{ cursor: 'pointer' }} />
      <div>
        <nav className={styles.navigation}>
          <ul>
            <li className={styles.headers} onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
                Chatbot
            </li>
            <li className={styles.headers} onClick={() => navigate('/playground')} style={{ cursor: 'pointer' }}>
                Playground
            </li>
            <li className={styles.headers} onClick={() => navigate('/deploy')} style={{ cursor: 'pointer' }}>
                Deploy
            </li>
            <li className={styles.headers} onClick={() => navigate('/upload')} style={{ cursor: 'pointer' }}>
                Build
            </li>
          </ul>
        </nav>
      </div>
      <img className={styles.profile} src={pic} alt="Logo image" onClick={() => navigate('/profile')} style={{ cursor: 'pointer' }} />

      <div className={styles.uploadSection}>
        <div className={styles.verticalBar}>
          <ul className={styles.verticalContent}>
            <li className={styles.content}>Upload Files</li>
            <li className={styles.content}>Q&A</li>
            <li className={styles.content}>Text</li>
          </ul>
        </div>
        <div className={styles.uploadFile}>
          <input
            type="file"
            className={styles.fileInput}
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileUpload}
            disabled={existingFile}
          />
          <div className={styles.uploadLabel}>
            <Plus className={styles.plusIcon} />
            <p className={styles.uploadText}>
              Click anywhere to upload files<br />
              (PDF, DOC, DOCX, or TXT)
            </p>
          </div>
        </div>
      </div>
      
      <div className={styles.trainingSection}>
        <div className={styles.existingFileBox}>
          {existingFile ? (
            <div className={styles.fileEntry}>
              <FileIcon size={24} color="#4F46E5"/>
              <span className={styles.fileName}>{existingFile}</span>
              <Trash2 
                className={styles.deleteIcon}
                size={20}
                onClick={handleDeleteExistingFile}
              />
            </div>
          ) : trainedFiles.length > 0 ? (
            trainedFiles.map((file, index) => (
              <div key={index} className={styles.fileEntry}>
                <FileIcon size={24} color="#4F46E5"/>
                <span className={styles.fileName}>
                  {file.name} (Uploaded on {file.date})
                </span>
              </div>
            ))
          ) : (
            <p className={styles.fileName}>No files uploaded yet</p>
          )}
        </div>
        
        <button 
          className={styles.trainButton}
          onClick={handleTrainChatbot}
          disabled={existingFile || trainedFiles.length === 0 || isTraining}
        >
          {isTraining ? 'Training in Progress...' : 'Train Chatbot'}
        </button>
        
        {isTraining && (
          <>
            <div className={styles.progressBarContainer}>
              <div 
                className={styles.progressBar} 
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className={styles.trainingStatus}>
              Training Progress: {progress}%
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default Upload;