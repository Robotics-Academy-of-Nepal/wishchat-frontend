import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PaymentFailure() {
    const navigate = useNavigate(); // Initialize the navigate function

    useEffect(() => {
        // Extract the `data` parameter from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const encodedData = urlParams.get('data');

        if (encodedData) {
            // Get the API key from local storage or state
            const apiKey = localStorage.getItem('apiKey'); // Replace with your logic to get the API key
            const token = localStorage.getItem('token');
            // Send the encoded data to the backend
            fetch('https://wishchat.goodwish.com.np/api/payment-success/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': apiKey, // Include the API key in the headers
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify({ data: encodedData }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log("Backend response:", data);
                    // Check the response status and set navigation delay accordingly
                    if (data.success) {
                        setTimeout(() => {
                            navigate('/'); // Navigate to the homepage after 2 seconds on success
                        }, 2000);
                    } else {
                        setTimeout(() => {
                            navigate('/'); // Navigate to the homepage after 4 seconds on failure
                        }, 4000);
                    }
                })
                .catch((error) => {
                    console.error("Error sending data to backend:", error);
                    // Navigate after 4 seconds in case of an error
                    setTimeout(() => {
                        navigate('/');
                    }, 4000);
                });
        } else {
            console.error("No data parameter found in the URL");
            // Navigate after 4 seconds if no data is found
            setTimeout(() => {
                navigate('/');
            }, 4000);
        }
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-white rounded-lg shadow-lg">
            <h1 className="mb-4 text-4xl font-semibold text-red-600">Payment Failed</h1>
            <p className="mb-6 text-lg text-gray-800">
                Please contact the Wishchat support team for further assistance.
            </p>
            <div className="w-full max-w-md p-4 rounded-lg shadow-md bg-green-50"></div>
        </div>
    );
}
