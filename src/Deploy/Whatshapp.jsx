import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

export default function Whatshapp() {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('jsx');
  const [formData, setFormData] = useState({
    whatsapp_token: '',
    whatsapp_id: '',
    whatsapp_url: '',
 // Add language to the initial formData state
  });

  const handleRadioChange = (e) => {
    setSelectedLanguage(e.target.value);
    setFormData((prevData) => ({
      ...prevData,
      language: e.target.value, // Update the formData with the selected language
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  console.log(token);
  const handleSubmit = async (e) => {
 
    e.preventDefault();
    
    // Send data to server
    try {
      const response = await fetch(' http://192.168.1.29:8000/auth/whatsapp-credentials/', {
        method: 'POST',
        headers: {
            'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), 
      });

      if (response.ok) {
        console.log('Data submitted successfully');
        navigate('/woutput');
      } else {
        console.error('Error submitting data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center bg-white" style={{ fontFamily: "Georgia" }}>
      <div className="flex flex-col items-center justify-center w-full max-w-lg p-10 mt-5 transition-transform duration-300 ease-in-out transform bg-white shadow-2xl shadow-black rounded-xl hover:shadow-2xl hover:shadow-black">
        <h1 className="mb-8 text-4xl font-bold tracking-wide text-center text-black">Fill in Your Data</h1>

        {/* <div className="flex flex-col items-start justify-start w-full px-3 pb-3 mb-6 scale-105 border-gray-500 border-solid rounded-md shadow-md outline-none hover:border-none shadow-black ">
          <label className="block mb-2 text-xl font-medium text-gray-600 text-start">Select Language:</label>
          <div className="flex items-center justify-center space-x-[70px] w-full">
            <div>
              <input
                type="radio"
                id="jsx"
                name="language"
                value="jsx"
                checked={selectedLanguage === 'jsx'}
                onChange={handleRadioChange}
                className="mr-2"
              />
              <label htmlFor="jsx" className="text-xl font-medium text-gray-600">JSX</label>
            </div>
            <div>
              <input
                type="radio"
                id="typescript"
                name="language"
                value="typescript"
                checked={selectedLanguage === 'typescript'}
                onChange={handleRadioChange}
                className="mr-2"
              />
              <label htmlFor="typescript" className="text-xl font-medium text-gray-600">TypeScript</label>
            </div>
          </div>
        </div> */}

        <form className="w-full space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">Access Token</label>
            <input
              type="text"
              name="whatsapp_token"
              value={formData.whatsapp_token}
              onChange={handleInputChange}
              className="w-full px-4 py-3 transition-all duration-200 border-gray-500 border-solid rounded-lg border-1 focus:border-none focus:shadow-md focus:shadow-black focus:scale-105 focus:outline-none"
              placeholder="Enter Access Token"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">Account ID</label>
            <input
              type="text"
              name="whatsapp_id"
              value={formData.whatsapp_id}
              onChange={handleInputChange}
              className="w-full px-4 py-3 transition-all duration-200 border-gray-500 border-solid rounded-lg border-1 focus:border-none focus:shadow-md focus:shadow-black focus:scale-105 focus:outline-none"
              placeholder="Enter Account ID"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">Message API</label>
            <input
              type="text"
              name="whatsapp_url"
              value={formData.whatsapp_url}
              onChange={handleInputChange}
              className="w-full px-4 py-3 transition-all duration-200 border-gray-500 border-solid rounded-lg border-1 focus:border-none focus:shadow-md focus:shadow-black focus:scale-105 focus:outline-none"
              placeholder="Enter Message API"
            />
          </div>
          <div className="mt-8">
            <button
              type="submit"
              className="w-full py-3 text-lg font-semibold text-white transition-all duration-300 transform bg-green-600 rounded-lg shadow-md focus:outline-none hover:bg-green-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
