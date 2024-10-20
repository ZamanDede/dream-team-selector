// src/components/Field.jsx
"use client";

import React from 'react';
import { useDrop } from 'react-dnd';
import { useState } from 'react';

const Field = () => {
  const [fieldCharacters, setFieldCharacters] = useState([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'character',
    drop: (item) => handleDrop(item.character),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const handleDrop = (character) => {
    // Avoid adding duplicate characters
    setFieldCharacters((prev) => {
      if (prev.find((c) => c.id === character.id)) {
        return prev;
      }
      return [...prev, { ...character, position: 'Select Position' }];
    });
  };

  const updatePosition = (characterId, newPosition) => {
    setFieldCharacters((prev) =>
      prev.map((c) =>
        c.id === characterId ? { ...c, position: newPosition } : c
      )
    );
  };

  return (
    <div
      ref={drop}
      className={`bg-gray-800 p-4 rounded shadow-md min-h-[400px] ${
        isOver ? 'bg-gray-600' : ''
      }`}
    >
      <h2 className="text-2xl font-bold text-center mb-4">Field</h2>
      {fieldCharacters.length > 0 ? (
        <div className="flex flex-wrap gap-4">
          {fieldCharacters.map((character) => (
            <div
              key={character.id}
              className="flex flex-col items-center bg-gray-700 p-4 rounded shadow-md"
            >
              <img
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
                className="w-24 h-24 rounded mb-2"
              />
              <span className="text-lg font-semibold mb-2">{character.name}</span>
              <select
                value={character.position}
                onChange={(e) =>
                  updatePosition(character.id, e.target.value)
                }
                className="bg-gray-800 text-white p-2 rounded"
              >
                <option value="Select Position" disabled>
                  Select Position
                </option>
                <option value="GK">Goalkeeper (GK)</option>
                <option value="ST">Striker (ST)</option>
                <option value="MD">Midfielder (MD)</option>
                <option value="DF">Defender (DF)</option>
              </select>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center">No characters on the field yet.</p>
      )}
    </div>
  );
};

export default Field;
