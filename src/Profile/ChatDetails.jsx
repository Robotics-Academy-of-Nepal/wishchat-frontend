import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ChatDetails() {
  const [activateSection, setActiveSection] = useState('data');
  const [messageData, setMessageData] = useState(null);

  const api = localStorage.getItem('apiKey');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchMessageData = async () => {
      try {
        const response = await fetch('https://wishchat.goodwish.com.np/api/message-usage/', {
          headers: {
            'X-API-Key': api,
            Authorization: `Token ${token}`,
          },
        });
        const data = await response.json();
        setMessageData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMessageData();
  }, [api, token]);

  const graphData = {
    labels: ['Total Messages', 'Days Remaining', 'Messages Used', 'Messages Remaining'],
    datasets: [
      {
        label: 'Usage Statistics',
        data: messageData
          ? [
              messageData.message_limit || 0,
              messageData.days_remaining || 0,
              messageData.messages_used || 0,
              messageData.messages_remaining || 0,
            ]
          : [0, 0, 0, 0],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const graphOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allows the graph to take the full height and width of its container
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 14, // Larger font size for labels
          },
        },
      },
      title: {
        display: true,
        text: 'Message Usage Statistics',
        font: {
          size: 18, // Larger title font
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 14, // Larger font for x-axis
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 14, // Larger font for y-axis
          },
        },
      },
    },
  };

  return (
    <div>
      <div className="w-full max-w-sm p-6 bg-white shadow-xl sm:max-w-md md:max-w-lg lg:max-w-2xl md:p-8 dark:bg-gray-800 rounded-2xl">
        <div className="flex gap-3 mb-4">
          <button
            className="px-4 py-2 text-white transition-colors bg-blue-500 rounded-lg shadow-sm hover:bg-blue-600"
            onClick={() => setActiveSection('graph')}
          >
            Graph
          </button>
          <button
            className="px-4 py-2 text-white transition-colors bg-blue-500 rounded-lg shadow-sm hover:bg-blue-600"
            onClick={() => setActiveSection('data')}
          >
            Data
          </button>
        </div>

     
        {activateSection === 'data' && messageData && (
          <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 transition-all bg-white rounded-lg shadow-md hover:shadow-lg">
              <h2 className="text-lg font-semibold">Account Status</h2>
              <p className="text-xl font-medium">{messageData.status || 'N/A'}</p>
            </div>
            <div className="p-6 transition-all bg-white rounded-lg shadow-md hover:shadow-lg">
              <h2 className="text-lg font-semibold">Account Type</h2>
              <p className="text-xl font-medium">{messageData.is_trial ? 'Trial' : 'Paid'}</p>
            </div>
            <div className="p-6 transition-all bg-white rounded-lg shadow-md hover:shadow-lg">
              <h2 className="text-lg font-semibold">Total Messages</h2>
              <p className="text-xl font-medium">{messageData.message_limit || '0'}</p>
            </div>
            <div className="p-6 transition-all bg-white rounded-lg shadow-md hover:shadow-lg">
              <h2 className="text-lg font-semibold">Days Remaining</h2>
              <p className="text-xl font-medium">{messageData.days_remaining || '0'}</p>
            </div>
            <div className="p-6 transition-all bg-white rounded-lg shadow-md hover:shadow-lg">
              <h2 className="text-lg font-semibold">Messages Used</h2>
              <p className="text-xl font-medium">{messageData.messages_used || '0'}</p>
            </div>
            <div className="p-6 transition-all bg-white rounded-lg shadow-md hover:shadow-lg">
              <h2 className="text-lg font-semibold">Messages Remaining</h2>
              <p className="text-xl font-medium">{messageData.messages_remaining || '0'}</p>
            </div>
          </div>
        )}

        {activateSection === 'graph' && messageData && (
          <div className="mt-4">
            <h1 className="mb-4 text-xl font-bold text-center">Message Details in Graph</h1>
            <div className="w-full p-4 bg-white rounded-lg shadow-md h-96 dark:bg-gray-700">
              <Bar data={graphData} options={graphOptions} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
