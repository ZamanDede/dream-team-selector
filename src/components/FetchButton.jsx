// src/components/FetchButton.jsx
"use client";

import React, { useState } from 'react';

const FetchButton = () => {
  const [loading, setLoading] = useState(false);
  const [progressMessage, setProgressMessage] = useState('');

  const handleFetchCharacters = async () => {
    setLoading(true);
    setProgressMessage('Fetching characters...');
    try {
      const response = await fetch('/api/characters'); // Call the API route
      const data = await response.json(); // Get the data

      if (response.ok) {
        setProgressMessage('Characters fetched successfully!');
        // Optionally, you can display the number of characters fetched
        console.log(`Fetched ${data.length} characters.`);
        // Refresh the page or update the state as needed
        window.location.reload(); // Refresh the page after loading completes
      } else {
        setProgressMessage('Failed to fetch characters.');
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error("Failed to fetch characters:", error);
      setProgressMessage('An error occurred while fetching characters.');
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <p className="text-white">{progressMessage}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={handleFetchCharacters}
        className="bg-green-500 text-white px-8 py-2 rounded mb-2 hover:bg-green-700"
      >
        Fetch Characters
      </button>
      {progressMessage && <p className="text-white">{progressMessage}</p>}
    </div>
  );
};

export default FetchButton;
