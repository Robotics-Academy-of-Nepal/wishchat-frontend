import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import background from '../assets/back.jpg';

function Company() {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const [error, setError] = useState('');

    const handleSubmitButton = async (e) => {
        e.preventDefault();

        if (!companyName.trim()) {
            setError('Company name is required');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(' http://192.168.1.29:8000/auth/update-company/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                body: JSON.stringify({ company_name: companyName }),
            });

            if (!response.ok) {
                throw new Error('Failed to update company name');
            }

            // Store company name in localStorage
            localStorage.setItem('company_name', companyName);

            // Navigate to dashboard
            navigate('/dashboard');
        } catch (error) {
            setError('Failed to update company name. Please try again.');
        }
    };

    return (
        <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '100vh',
          width: '100%',
        }}
        className="flex items-center justify-center">
        <div className="w-full max-w-lg p-10 space-y-8 bg-white shadow-2xl bg-opacity-70 rounded-xl backdrop-blur-md">
          <div className="text-center">
            <h2 className="mb-6 text-4xl font-semibold text-gray-900">Update Company Name</h2>
            <p className="text-lg text-gray-600">Please enter your company name below to update it.</p>
          </div>
      
          <div className="space-y-8">
            <label htmlFor="companyName" className="text-lg font-medium text-gray-700">Company Name</label>
            <input
              className="w-full p-4 text-lg transition duration-300 ease-in-out border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="companyName"
              name="companyName"
              placeholder="Enter company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
      
            {error && (
              <div className="mt-2 text-center">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
      
            <button
              className="w-full p-4 text-lg text-white transition duration-300 ease-in-out transform bg-blue-600 rounded-lg hover:bg-blue-700 hover:scale-105"
              onClick={handleSubmitButton}
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      
      
      
    );
}

export default Company;
