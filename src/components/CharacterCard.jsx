// src/components/CharacterCard.jsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const CharacterCard = ({ character, addToSideline, variant }) => {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div className="bg-gray-800 p-4 rounded shadow-md max-w-xs w-80 mx-auto mb-4 text-white">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">{character.name}</h3>
        {character.thumbnail && (
          <img
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={character.name}
            className="mx-auto rounded mb-2 w-48 h-48 object-cover"
          />
        )}
        <div className="space-x-4 mt-4">
          {variant === 'create' && (
            <>
              {/* Info Button for Description */}
              <button
                onClick={() => setShowDescription(true)}
                className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-300"
              >
                Info
              </button>

              {/* Add to Sideline Button */}
              <button
                onClick={() => addToSideline(character)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition-colors duration-300"
              >
                Add to Sideline
              </button>
            </>
          )}

          {variant === 'search' && (
            <>
              {/* View Details Button */}
              <Link
                href={`/characters/${character.id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300 inline-block"
              >
                View Details
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Modal for Description */}
      {variant === 'create' && showDescription && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">{character.name}</h3>
            <p className="text-gray-700">{character.description || "No description available."}</p>
            <button
              onClick={() => setShowDescription(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterCard;
