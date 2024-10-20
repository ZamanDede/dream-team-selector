// src/app/page.jsx
"use client";

import React, { useState } from 'react';

const Page = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rawData, setRawData] = useState(null);

  const handleFetchCharacters = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/characters'); // Call our API route
      const data = await response.json();
      if (data) {
        setRawData(data); // Save raw JSON data for display
        if (data.data && data.data.results) {
          setCharacters(data.data.results);
        }
      }
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
      <h1 className="text-2xl font-bold mb-4">Marvel Characters</h1>
      <button
        onClick={handleFetchCharacters}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-700"
      >
        Fetch Characters
      </button>

      <div className="mb-4">
        {characters.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-2">List of Characters</h2>
            <ul className="list-disc list-inside">
              {characters.map((character) => (
                <li key={character.id} className="mb-1">
                  {character.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {rawData && (
        <div className="bg-gray-100 p-4 rounded shadow-md">
          <h2 className="text-xl font-bold mb-2">Raw JSON Response</h2>
          <pre className="text-sm text-gray-800 overflow-x-scroll">
            {JSON.stringify(rawData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default Page;
