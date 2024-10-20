"use client";

import React, { useState, useEffect } from 'react';
import Field from '../../components/Field';
import Sideline from '../../components/Sideline';
import CharacterCard from '../../components/CharacterCard';
import CharacterSearch from '../../components/CharacterSearch';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const CreatePage = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [sidelineCharacters, setSidelineCharacters] = useState([]); // Sideline state
  const [currentPage, setCurrentPage] = useState(1);
  const charactersPerPage = 4;

  useEffect(() => {
    // Fetch data from public/characters.json
    const fetchCharacters = async () => {
      try {
        const response = await fetch('/characters.json'); // Fetch from public directory
        const data = await response.json();
        setCharacters(data);
        setFilteredCharacters(data);
      } catch (error) {
        console.error("Failed to load characters:", error);
      }
    };
    fetchCharacters();
  }, []);

  // Add character to sideline
  const addToSideline = (character) => {
    setSidelineCharacters((prev) => {
      // Avoid adding duplicate characters
      if (prev.find((c) => c.id === character.id)) {
        return prev;
      }
      return [...prev, character];
    });
  };

  // Remove character from sideline
  const removeFromSideline = (characterId) => {
    setSidelineCharacters((prev) => prev.filter((c) => c.id !== characterId));
  };

  // Calculate the current set of characters to be displayed for pagination
  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = filteredCharacters.slice(indexOfFirstCharacter, indexOfLastCharacter);

  // Handle page change
  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredCharacters.length / charactersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-gray-900 min-h-screen p-4">
        {/* Main Content */}
        <div className="container mx-auto flex gap-6">
          {/* Field Area */}
          <div className="flex-grow bg-gray-800 p-4 rounded-lg">
            <Field />
          </div>
          {/* Sideline Area */}
          <div className="w-1/4 bg-gray-700 p-4 rounded-lg">
            <Sideline characters={sidelineCharacters} removeFromSideline={removeFromSideline} />
          </div>
        </div>

        {/* Character Search component to filter and sort characters */}
        <div className="my-6">
          <CharacterSearch characters={characters} setFilteredCharacters={setFilteredCharacters} />
        </div>

        {/* Display Character Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {currentCharacters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              addToSideline={addToSideline} // Pass the function to CharacterCard
            />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center space-x-4 mt-8">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${
              currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'
            }`}
          >
            Previous
          </button>
          <span className="text-lg font-bold">
            Page {currentPage} of {Math.ceil(filteredCharacters.length / charactersPerPage)}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === Math.ceil(filteredCharacters.length / charactersPerPage)}
            className={`px-4 py-2 rounded ${
              currentPage === Math.ceil(filteredCharacters.length / charactersPerPage)
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-700 text-white'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </DndProvider>
  );
};

export default CreatePage;
