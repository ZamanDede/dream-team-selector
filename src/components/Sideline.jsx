"use client";

import React from 'react';

const Sideline = ({ characters }) => {
  return (
    <div className="bg-gray-700 p-4 rounded shadow-md min-h-[400px]">
      <h2 className="text-2xl font-bold text-center mb-4">Sideline</h2>
      {characters.length > 0 ? (
        <div className="flex flex-col gap-4">
          {characters.map((character) => (
            <div key={character.id} className="flex items-center gap-4 bg-gray-800 p-2 rounded shadow-md">
              <img
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
                className="w-12 h-12 rounded"
              />
              <span className="text-lg font-semibold">{character.name}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center">No characters added to sideline yet.</p>
      )}
    </div>
  );
};

export default Sideline;
