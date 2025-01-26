import React, { useState, useEffect } from 'react';
import { FiCopy } from 'react-icons/fi';

export default function WhatsappOutput() {
  const [url, setUrl] = useState('');
  const [code, setCode] = useState('');

  const token = localStorage.getItem('token');

  // Fetch data from the server when the component mounts
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch('http://192.168.1.3:8000/auth/whatsapp-credentials/', {
                method: 'POST', // Changed to POST
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ /* Your request body if needed */ }),
            });
            const data = await response.json();
            setUrl(data.webhookurl);
            setCode(data.verify_token);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    fetchData();
}, []);
 // Empty dependency array means this runs only once when the component mounts

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className='flex items-center justify-center m-4'style={{ fontFamily: "Georgia" }} >
      <div className='md:mt-[100px] flex flex-col gap-4 p-6 scale-105 bg-gray-100 rounded-lg shadow-md shadow-black'>
        <h1 className='text-2xl font-semibold text-center'>Copy and paste it into the Right place</h1>
        <div className='flex flex-col gap-4'>
          <div className='flex items-center justify-between gap-4'>
            <div className='flex items-center gap-2'>
              <h2 className='font-medium'>Url:</h2>
              <input
                type='text'
                value={url}
                onChange={(e) => setUrl(e.target.value)}
               
                className='w-full text-center md:w-[300px] p-2 border-2 border-gray-500 rounded-md focus:outline-none focus:border-blue-500'
              />
            </div>
            <button
              onClick={() => handleCopy(url)}
              className='p-2 text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600'
            >
              <FiCopy />
            </button>
          </div>

          <div className='flex items-center justify-between gap-4'>
            <div className='flex items-center gap-2'>
              <h2 className='font-medium'>Code:</h2>
              <input
                type='text'
                value={code}
                onChange={(e) => setCode(e.target.value)}
                disabled
                className='w-full  md:w-[300px] p-2  text-center border-2 border-gray-500 rounded-md focus:outline-none focus:border-blue-500'
              />
            </div>
            <button
              onClick={() => handleCopy(code)}
              className='p-2 text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600'
            >
              <FiCopy />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
