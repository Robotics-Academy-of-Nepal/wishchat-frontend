import React, { useState, useEffect } from 'react';

export default function TextUpload() {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [fileExists, setFileExists] = useState(false);
  const [fileId, setFileId] = useState(null);
  const [fileCount, setFileCount] = useState(0); // Track file count to enforce restrictions

  const filename = 'textupload.txt';
  const baseUrl = 'http://192.168.1.29:8000/api';

  useEffect(() => {
    fetchExistingFile();
  }, []);

  const fetchExistingFile = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      setIsLoading(true);
      setMessage('');

      // Fetch all documents
      const response = await fetch(`${baseUrl}/documents/`, {
        headers: { Authorization: `Token ${token}` },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch documents: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched files:', data);

      setFileCount(data.total_count); // Update file count for restrictions

      const files = data.documents || [];
      if (!Array.isArray(files)) throw new Error('Unexpected API response format');

      // Find the latest `textupload.txt`
      const fileList = files
        .filter((file) => file.filename === filename)
        .sort((a, b) => new Date(b.uploaded_at) - new Date(a.uploaded_at));

      if (fileList.length > 0) {
        const latestFile = fileList[0];
        setFileExists(true);
        setFileId(latestFile.id);
        await fetchFileContent(latestFile.id);
      } else {
        setFileExists(false);
        setFileId(null);
        setText('');
      }
    } catch (error) {
      console.error('Error fetching file list:', error);
      setMessage('⚠️ Error fetching files.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFileContent = async (fileId) => {
    const token = localStorage.getItem('token');
    console.log(fileId)
    try {
      const response = await fetch(`${baseUrl}/documents/${fileId}/`,{
        headers: { Authorization: `Token ${token}` },
      });
      if (!response.ok) throw new Error('Failed to fetch file content');

      const content = await response.text();
      setText(content);
    } catch (error) {
      console.error('Error fetching file content:', error);
      setMessage('⚠️ Error loading file content.');
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    if (!text.trim()) {
      setMessage('❌ Please enter some text before submitting.');
      return;
    }

    // Restriction: Allow updates if `textupload.txt` exists but prevent new uploads when total_count >= 3
    if (fileCount >= 3 && !fileExists) {
      setMessage('⚠️ Maximum file limit reached. Cannot upload new files.');
      return;
    }

    try {
      setIsLoading(true);
      setMessage('');

      // Step 1: Delete the existing file if it exists
      if (fileExists && fileId) {
        const deleteResponse = await fetch(`${baseUrl}/documents/delete/${fileId}/`, {
          method: 'DELETE',
          headers: { Authorization: `Token ${token}` },
        });

        if (!deleteResponse.ok) throw new Error('Failed to delete the existing file');
        console.log('Existing file deleted successfully');
      }

      // Step 2: Upload the new file
      const formData = new FormData();
      formData.append('file', new Blob([text], { type: 'text/plain' }), filename);
      formData.append('filename', 'textupload.txt');

      const uploadResponse = await fetch(`${baseUrl}/upload/`, {
        method: 'POST',
        body: formData,
        headers: { Authorization: `Token ${token}` },
      });

      let responseData;
      try {
        responseData = await uploadResponse.json();
      } catch {
        responseData = null;
      }

      if (uploadResponse.ok) {
        setMessage('✅ File updated successfully!');
        setFileExists(true);
        fetchExistingFile(); // Refresh file info
      } else {
        setMessage(`❌ Upload failed: ${responseData?.errors?.[0] || 'Server error'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('⚠️ An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    if (!fileId) {
      setMessage('⚠️ No file to delete.');
      return;
    }

    try {
      setIsLoading(true);
      setMessage('');

      const response = await fetch(`${baseUrl}/documents/delete/${fileId}/`, {
        method: 'DELETE',
        headers: { Authorization: `Token ${token}` },
      });

      if (response.ok) {
        setMessage('✅ File deleted successfully!');
        setFileExists(false);
        setText('');
        setFileId(null);
        fetchExistingFile(); // Refresh file list
      } else {
        setMessage('❌ Failed to delete file.');
      }
    } catch (error) {
      console.error('Error deleting file:', error);
      setMessage('⚠️ An error occurred while deleting.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-lg p-8 mx-auto bg-gray-100 shadow-lg rounded-xl">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">Text Upload</h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="6"
        className="w-full p-4 mb-4 text-lg border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="Enter your message here..."
      />

      <div className="flex gap-4">
        <button
          onClick={handleSubmit}
          className={`bg-green-500 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 ${
            isLoading || (fileCount >= 3 && !fileExists) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'
          }`}
          disabled={isLoading || (fileCount >= 3 && !fileExists)}
        >
          {isLoading ? 'Uploading...' : fileExists ? 'Update' : 'Upload'}
        </button>

        {fileExists && (
          <button
            onClick={handleDelete}
            className="px-6 py-2 font-semibold text-white transition-all duration-300 bg-red-500 rounded-lg hover:bg-red-600"
          >
            Delete
          </button>
        )}
      </div>

      {message && (
        <p className={`mt-4 text-sm ${message.includes('✅') ? 'text-green-600' : 'text-red-500'}`}>
          {message}
        </p>
      )}
    </div>
  );
}



