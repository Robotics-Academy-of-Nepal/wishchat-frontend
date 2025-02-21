import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import Navbar from '../Components/Navbar/Navbar';

const Uploaded = () => {
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFiles();
  }, []);

  // Fetch files from API
  const fetchFiles = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await fetch('http://192.168.1.29:8000/api/documents/', {
        method: 'GET',
        headers: { Authorization: `Token ${token}` },
      });

      if (!response.ok) throw new Error(`Error fetching files: ${response.statusText}`);

      const data = await response.json();
      setFileList(data.documents || []); // Extract documents array
    } catch (error) {
      setError(error.message);
      console.error('Error fetching files:', error);
    } finally {
      setLoading(false);
    }
  };

  // Delete a single file
  const handleDeleteFile = async (fileId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await fetch(`http://192.168.1.29:8000/api/documents/delete/${fileId}/`, {
        method: 'DELETE',
        headers: { Authorization: `Token ${token}` },
      });

      if (!response.ok) throw new Error(`Error deleting file: ${response.statusText}`);

      // Update UI after deletion
      setFileList(fileList.filter(file => file.id !== fileId));
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  // Delete all files
  const handleDeleteAllFiles = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await fetch('http://192.168.1.29:8000/api/documents/delete/', {
        method: 'DELETE',
        headers: { Authorization: `Token ${token}` },
      });

      if (!response.ok) throw new Error(`Error deleting all files: ${response.statusText}`);

      // Clear file list after successful deletion
      setFileList([]);
    } catch (error) {
      console.error('Error deleting all files:', error);
    }
  };

  return (
    <div>

      <div className="p-6">
        <h2 className="mb-4 text-2xl font-bold">Uploaded Files</h2>

        {loading ? (
          <p>Loading files...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : fileList.length > 0 ? (
          <>
            <ul className="p-4 bg-white rounded-lg shadow-md">
              {fileList.map(({ id, filename, uploaded_at }) => (
                <li key={id} className="flex items-center justify-between p-2 border-b">
                  <div>
                    <p className="font-semibold">{filename}</p>
                    {/* <p className="text-sm text-gray-500">Uploaded: {new Date(uploaded_at).toLocaleString()}</p> */}
                  </div>
                  <Trash2
                    className="text-red-500 cursor-pointer hover:text-red-600"
                    onClick={() => handleDeleteFile(id)}
                  />
                </li>
              ))}
            </ul>
            <button
              onClick={handleDeleteAllFiles}
              className="px-4 py-2 mt-4 text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              Delete All Files
            </button>
          </>
        ) : (
          <p>No files uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default Uploaded;
