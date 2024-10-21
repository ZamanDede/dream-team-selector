// src/app/characters/page.jsx
"use client";

import React, { useState, useEffect } from 'react';
import CharacterCard from '../../components/CharacterCard';
import CharacterSearch from '../../components/CharacterSearch';

const CharactersPage = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const charactersPerPage = 12;

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

  // Reset currentPage to 1 whenever filteredCharacters change (e.g., on search or sort)
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredCharacters]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredCharacters.length / charactersPerPage);

  // Calculate the current set of characters to be displayed
  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = filteredCharacters.slice(indexOfFirstCharacter, indexOfLastCharacter);

  // Function to generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbersToShow = 5; // Number of page links to show
    let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));
    let endPage = startPage + maxPageNumbersToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPageNumbersToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  return (
    <div className="container mx-auto p-4 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center text-white">Marvel Characters</h1>

      {/* Character Search component to filter and sort characters */}
      <div className="mb-6">
        <CharacterSearch
          characters={characters}
          setFilteredCharacters={setFilteredCharacters}
        />
      </div>

      {/* Display Character Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {currentCharacters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            variant="search" // Pass variant prop
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-2 mt-8">
        {/* First Page Button */}
        <button
          onClick={handleFirstPage}
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded ${
            currentPage === 1
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-700 text-white'
          }`}
        >
          First
        </button>

        {/* Previous Page Button */}
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded ${
            currentPage === 1
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-700 text-white'
          }`}
        >
          Prev
        </button>

        {/* Page Number Buttons */}
        {getPageNumbers().map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`px-3 py-2 rounded ${
              currentPage === pageNumber
                ? 'bg-blue-700 text-white'
                : 'bg-blue-500 hover:bg-blue-700 text-white'
            }`}
          >
            {pageNumber}
          </button>
        ))}

        {/* Next Page Button */}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded ${
            currentPage === totalPages
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-700 text-white'
          }`}
        >
          Next
        </button>

        {/* Last Page Button */}
        <button
          onClick={handleLastPage}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded ${
            currentPage === totalPages
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-700 text-white'
          }`}
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default CharactersPage;
