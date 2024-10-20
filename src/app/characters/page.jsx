"use client";

import React, { useState, useEffect } from 'react';
import CharacterCard from '../../components/CharacterCard';
import CharacterSearch from '../../components/CharacterSearch';

const CharactersPage = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const charactersPerPage = 8;

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

  const addToSideline = (character) => {
    console.log(`${character.name} added to sideline`);
    // Logic to add character to sideline (possibly update global state)
  };

  // Calculate the current set of characters to be displayed
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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Marvel Characters</h1>

      {/* Character Search component to filter and sort characters */}
      <div className="mb-6">
        <CharacterSearch
          characters={characters}
          setFilteredCharacters={setFilteredCharacters}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {currentCharacters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            addToSideline={addToSideline}
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
  );
};

export default CharactersPage;
