"use client";

import React, { useState, useRef } from 'react';
import { useDrop } from 'react-dnd';

const predefinedPositions = [
  { id: 1, name: "GK", x: 50, y: 90 }, // Goalkeeper
  { id: 2, name: "DF", x: 20, y: 70 }, // Left Defender
  { id: 3, name: "DF", x: 50, y: 70 }, // Center Defender 1
  { id: 4, name: "DF", x: 80, y: 70 }, // Right Defender
  { id: 5, name: "MD", x: 20, y: 50 }, // Left Midfielder
  { id: 6, name: "MD", x: 50, y: 50 }, // Center Midfielder 1
  { id: 7, name: "MD", x: 80, y: 50 }, // Right Midfielder
  { id: 8, name: "ST", x: 20, y: 30 }, // Left Attacker
  { id: 9, name: "ST", x: 50, y: 30 }, // Center Attacker 1
  { id: 10, name: "ST", x: 80, y: 30 }, // Right Attacker
];

const Field = () => {
  const [fieldCharacters, setFieldCharacters] = useState([]); // Store placed characters
  const [hoveredPosition, setHoveredPosition] = useState(null); // Track hovered position
  const fieldRef = useRef(null); // Create a ref for the Field component

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'character',
    drop: (item, monitor) => {
      const dropOffset = monitor.getClientOffset(); // Get the mouse pointer location on drop
      handleDrop(item.character, dropOffset);
      setHoveredPosition(null); // Clear hover on drop
    },
    hover: (item, monitor) => {
      const dropOffset = monitor.getClientOffset(); // Get hover location
      const nearestPosition = getNearestPosition(dropOffset);
      if (
        nearestPosition &&
        !fieldCharacters.find((c) => c.position.id === nearestPosition.id)
      ) {
        setHoveredPosition(nearestPosition.id); // Set the hovered position
      } else {
        setHoveredPosition(null); // If position occupied or no nearest position, don't highlight
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const handleDrop = (character, dropOffset) => {
    if (fieldCharacters.length >= 6) {
      return;
    }

    const nearestPosition = getNearestPosition(dropOffset);
    if (
      !nearestPosition ||
      fieldCharacters.find((c) => c.position.id === nearestPosition.id)
    ) {
      return; // Position is occupied or no nearest position, do nothing
    }

    setFieldCharacters((prev) => {
      if (prev.find((c) => c.id === character.id)) {
        return prev;
      }
      return [...prev, { ...character, position: nearestPosition }];
    });
  };

  const getNearestPosition = (dropOffset) => {
    if (!fieldRef.current) return null;

    const fieldRect = fieldRef.current.getBoundingClientRect();

    // Adjust dropOffset to be relative to fieldRect
    const relativeX = dropOffset.x - fieldRect.left;
    const relativeY = dropOffset.y - fieldRect.top;

    let nearestPosition = null;
    let minDistance = Infinity;

    predefinedPositions.forEach((position) => {
      const posX = (position.x / 100) * fieldRect.width;
      const posY = (position.y / 100) * fieldRect.height;

      const distance = Math.sqrt(
        Math.pow(posX - relativeX, 2) + Math.pow(posY - relativeY, 2)
      );

      if (distance < minDistance) {
        minDistance = distance;
        nearestPosition = position;
      }
    });

    return nearestPosition;
  };

  // Remove character from the field
  const removeCharacter = (characterId) => {
    setFieldCharacters((prev) => prev.filter((c) => c.id !== characterId));
  };

  return (
    <div
      ref={(node) => {
        drop(node);
        fieldRef.current = node; // Attach both ref and drop
      }}
      className={`relative bg-gray-800 p-4 rounded shadow-md min-h-[400px] ${
        isOver ? 'bg-gray-600' : ''
      }`}
      style={{ position: 'relative', height: '600px', width: '100%' }}
    >
      <h2 className="text-2xl font-bold text-center mb-4">Field</h2>

      {/* Render predefined positions */}
      {predefinedPositions.map((position) => (
        <div
          key={position.id}
          className={`absolute border ${
            hoveredPosition === position.id ? 'border-blue-400' : 'border-gray-600'
          } rounded`}
          style={{
            top: `${position.y}%`,
            left: `${position.x}%`,
            width: '60px',
            height: '60px',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor:
              hoveredPosition === position.id ? 'rgba(59, 130, 246, 0.5)' : 'transparent',
          }}
        >
          {fieldCharacters.find((c) => c.position.id === position.id) ? (
            <div className="flex flex-col items-center">
              <img
                src={`${fieldCharacters.find((c) => c.position.id === position.id).thumbnail.path}.${fieldCharacters.find((c) => c.position.id === position.id).thumbnail.extension}`}
                alt={fieldCharacters.find((c) => c.position.id === position.id).name}
                className="w-12 h-12 rounded mb-2"
              />
              <button
                onClick={() => removeCharacter(fieldCharacters.find((c) => c.position.id === position.id).id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ) : (
            <span className="text-gray-400">{position.name}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Field;
