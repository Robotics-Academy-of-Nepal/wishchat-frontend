import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

function PaymentSuccess() {
    const navigate = useNavigate(); // Initialize the navigate function
    const [isPaymentProcessed, setIsPaymentProcessed] = useState(false); // State to track if payment has been processed

    useEffect(() => {
        // Prevent the effect from running if the payment has already been processed
        if (isPaymentProcessed) return;

        // Extract the `data` parameter from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const encodedData = urlParams.get('data');

        if (encodedData) {
            // Get the API key from local storage or state
            const apiKey = localStorage.getItem('apiKey'); // Replace with your logic to get the API key
            const token = localStorage.getItem('token');
            
            // Send the encoded data to the backend
            fetch(' http://192.168.1.29:8000/api/payment-success/', {
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
                    setIsPaymentProcessed(true); // Mark payment as processed
                    // Wait for 2 seconds before navigating to '/'
                    setTimeout(() => {
                        navigate('/'); // Navigate to the homepage
                    }, 2000); // 2000ms = 2 seconds
                })
                .catch((error) => {
                    console.error("Error sending data to backend:", error);
                });
        } else {
            console.error("No data parameter found in the URL");
        }
    }, [isPaymentProcessed, navigate]); // Dependency on isPaymentProcessed flag

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-white rounded-lg shadow-lg">
            <h1 className="mb-4 text-4xl font-semibold text-green-600">Payment Successful!</h1>
            <p className="mb-6 text-lg text-gray-600">Thank you for your payment. We are processing your transaction.</p>
            <div className="w-full max-w-md p-4 rounded-lg shadow-md bg-green-50">
                {/* You can add any content here if necessary */}
            </div>
        </div>
    );
}

export default PaymentSuccess;
