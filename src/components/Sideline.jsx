// src/components/Sideline.jsx
"use client";

import React from 'react';
import { useDrag } from 'react-dnd';

const Sideline = ({ characters, removeFromSideline }) => {
  return (
    <div className="bg-gray-700 p-4 rounded shadow-md min-h-[400px]">
      <h2 className="text-2xl font-bold text-center mb-4">Sideline</h2>
      {characters.length > 0 ? (
        <div className="flex flex-col gap-4">
          {characters.map((character) => (
            <DraggableCharacter
              key={character.id}
              character={character}
              removeFromSideline={removeFromSideline}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center">No characters added to sideline yet.</p>
      )}
    </div>
  );
};

const DraggableCharacter = ({ character, removeFromSideline }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'character',
    item: { character },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`flex items-center gap-4 bg-gray-800 p-2 rounded shadow-md ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <img
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        alt={character.name}
        className="w-12 h-12 rounded"
      />
      <span className="text-lg font-semibold">{character.name}</span>
      <button
        onClick={() => removeFromSideline(character.id)}
        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 ml-auto"
      >
        X
      </button>
    </div>
  );
};

export default Sideline;
