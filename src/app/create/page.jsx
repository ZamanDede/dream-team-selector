// src/app/create/page.jsx
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
  const [selectedCharacters, setSelectedCharacters] = useState([]); // Shared state
  const [currentPage, setCurrentPage] = useState(1);
  const charactersPerPage = 4;

  const [showSaveModal, setShowSaveModal] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [saveMessage, setSaveMessage] = useState('');

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

  // Add character to selectedCharacters (limit total to 12)
  const addToSelectedCharacters = (character) => {
    const sidelineCharacters = selectedCharacters.filter((c) => c.location === 'sideline');

    if (selectedCharacters.length >= 12) {
      alert("Maximum of 12 characters allowed (6 on field, 6 on sideline).");
      return;
    }

    if (sidelineCharacters.length >= 6) {
      alert("Sideline is full. Maximum 6 players allowed.");
      return;
    }

    if (selectedCharacters.find((c) => c.id === character.id)) {
      alert("Character is already selected.");
      return;
    }

    setSelectedCharacters((prev) => [...prev, { ...character, location: 'sideline' }]);
  };

  // Remove character from selectedCharacters
  const removeFromSelectedCharacters = (characterId) => {
    setSelectedCharacters((prev) => prev.filter((c) => c.id !== characterId));
  };

  // Function to move character between field and sideline
  const moveCharacter = (character, from, to) => {
    if (from === to) {
      // Update character's position within the same location
      setSelectedCharacters((prev) =>
        prev.map((c) => {
          if (c.id === character.id) {
            return { ...character }; // Update character's position
          }
          return c;
        })
      );
      return;
    }

    const fieldCharacters = selectedCharacters.filter((c) => c.location === 'field');
    const sidelineCharacters = selectedCharacters.filter((c) => c.location === 'sideline');

    if (to === 'field') {
      if (fieldCharacters.length >= 5) {
        alert("Field is full. Maximum 5 players allowed.");
        return;
      }
    }

    if (to === 'sideline') {
      if (sidelineCharacters.length >= 6) {
        alert("Sideline is full. Maximum 6 players allowed.");
        return;
      }
    }

    // Update character's location and position
    setSelectedCharacters((prev) =>
      prev.map((c) => {
        if (c.id === character.id) {
          return { ...character, location: to };
        }
        return c;
      })
    );
  };

  // Validation function for field positions
  const validateFieldPositions = (fieldCharacters) => {
    if (fieldCharacters.length !== 5) {
      return 'The field must have exactly 5 players.';
    }

    const positionCounts = fieldCharacters.reduce((counts, c) => {
      const posName = c.position?.name;
      if (posName) {
        counts[posName] = (counts[posName] || 0) + 1;
      }
      return counts;
    }, {});

    const requiredPositions = ['GK', 'DF', 'MD', 'ST'];
    for (const pos of requiredPositions) {
      if (!positionCounts[pos] || positionCounts[pos] < 1) {
        return `At least one ${pos} is required on the field.`;
      }
    }

    return null; // Valid team
  };

  // Get fieldCharacters and sidelineCharacters from selectedCharacters
  const fieldCharacters = selectedCharacters.filter((c) => c.location === 'field');
  const sidelineCharacters = selectedCharacters.filter((c) => c.location === 'sideline');

  // Calculate total pages
  const totalPages = Math.ceil(filteredCharacters.length / charactersPerPage);

  // Calculate the current set of characters to be displayed for pagination
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

  // Handle team save or finalize
  const handleSaveTeam = () => {
    const errorMessage = validateFieldPositions(fieldCharacters);
    if (errorMessage) {
      alert(errorMessage);
      return;
    }
    // Open the save modal
    setShowSaveModal(true);
  };

  const handleSaveTeamSubmit = async (e) => {
    e.preventDefault();

    // Prepare team data
    const teamData = {
      teamName,
      fieldCharacters,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch('/api/saveTeam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teamData),
      });

      const result = await response.json();

      if (response.ok) {
        setSaveMessage('Team saved successfully!');
        // Reset team name and close modal after a delay
        setTimeout(() => {
          setTeamName('');
          setShowSaveModal(false);
          setSaveMessage('');
        }, 2000);
      } else {
        setSaveMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error saving team:', error);
      setSaveMessage('An error occurred while saving the team.');
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-gray-900 min-h-screen p-4">
        {/* Main Content */}
        <div className="container mx-auto flex gap-6">
          {/* Field Area */}
          <div className="flex-grow bg-gray-800 p-4 rounded-lg">
            <Field fieldCharacters={fieldCharacters} moveCharacter={moveCharacter} />
            <button
              onClick={handleSaveTeam}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save Team
            </button>
          </div>
          {/* Sideline Area */}
          <div className="w-1/4 bg-gray-700 p-4 rounded-lg">
            <Sideline
              characters={sidelineCharacters}
              moveCharacter={moveCharacter}
              removeFromSideline={removeFromSelectedCharacters}
            />
          </div>
        </div>

        {/* Character Search component to filter and sort characters */}
        <div className="my-6">
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
              addToSideline={addToSelectedCharacters}
              variant="create" // Pass variant prop
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

        {/* Save Team Modal */}
        {showSaveModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded p-6 w-96">
              <h2 className="text-2xl font-bold mb-4">Save Your Team</h2>
              <form onSubmit={handleSaveTeamSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Team Name
                  </label>
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter team name"
                  />
                </div>
                {saveMessage && <p className="mb-4 text-green-500">{saveMessage}</p>}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowSaveModal(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default CreatePage;
