"use client";

import React, { useState, useEffect } from 'react';
import FetchButton from '../components/FetchButton';

const CharacterSearch = ({ characters, setFilteredCharacters, refreshCharacters }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    handleSearch();
  }, [searchTerm, searchField, sortOrder]);

  const handleSearch = () => {
    // Filter characters based on the search term and selected field
    let filtered = characters.filter((character) => {
      if (searchField === "name") {
        return character.name.toLowerCase().includes(searchTerm.toLowerCase());
      } else if (searchField === "description") {
        return (
          character.description &&
          character.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      return false;
    });



    // Sort characters based on name and sort order
    filtered.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    setFilteredCharacters(filtered);
  };

  return (
    <div className="container mx-auto p-4 mb-4 bg-gray-800 rounded-md shadow-md">
      <div className="flex items-center w-full gap-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search characters..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-500 rounded w-full text-black bg-gray-200"
        />

        {/* Search Field Dropdown */}
        <select
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
          className="p-2 border border-gray-500 rounded text-black bg-gray-200"
        >
          <option value="name">Name</option>
          <option value="description">Description</option>
        </select>

        {/* Sort Order Dropdown */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-2 border border-gray-500 rounded text-black bg-gray-200"
        >
          <option value="asc">Sort by Name (A-Z)</option>
          <option value="desc">Sort by Name (Z-A)</option>
        </select>

        {/* Fetch Button - align this to the far right */}
        <div className="ml-auto">
          <FetchButton refreshCharacters={refreshCharacters} />
        </div>
      </div>
    </div>
  );
};

export default CharacterSearch;
