"use client";

import React, { useState } from 'react';

const FetchButton = () => {
  const [loading, setLoading] = useState(false);

  const handleFetchCharacters = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/characters'); // Call the API route
      await response.json(); // Trigger the saving mechanism
      window.location.reload(); // Refresh the page after loading completes
    } catch (error) {
      console.error("Failed to fetch characters:", error);
    }
    setLoading(false);
  };

  if (loading) {
    return <div>Loading characters...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={handleFetchCharacters}
        className="bg-green-500 text-white px-8 py-2 rounded mb-2 hover:bg-green-700"
      >
        Fetch Characters
      </button>
    </div>
  );
};

export default FetchButton;
