// src/components/Field.jsx
"use client";

import React, { useState, useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';

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

const Field = ({ fieldCharacters, moveCharacter }) => {
  const [hoveredPosition, setHoveredPosition] = useState(null); // Track hovered position
  const fieldRef = useRef(null); // Create a ref for the Field component

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'character',
    drop: (item, monitor) => {
      const dropOffset = monitor.getClientOffset(); // Get the mouse pointer location on drop
      handleDrop(item.character, dropOffset, item.from);
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

  const handleDrop = (character, dropOffset, from) => {
    const nearestPosition = getNearestPosition(dropOffset);
    if (
      !nearestPosition ||
      fieldCharacters.find((c) => c.position.id === nearestPosition.id)
    ) {
      return; // Position is occupied or no nearest position, do nothing
    }

    // Add position to character
    const characterWithPosition = { ...character, position: nearestPosition };
    moveCharacter(characterWithPosition, from, 'field');
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
      {predefinedPositions.map((position) => {
        const character = fieldCharacters.find((c) => c.position.id === position.id);

        return (
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
            {character ? (
              <DraggableFieldCharacter
                character={character}
                moveCharacter={moveCharacter}
                from="field"
              />
            ) : (
              <span className="text-gray-400">{position.name}</span>
            )}
          </div>
        );
      })}
    </div>
  );
};

const DraggableFieldCharacter = ({ character, moveCharacter, from }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'character',
    item: { character, from },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`flex flex-col items-center ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <img
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        alt={character.name}
        className="w-12 h-12 rounded mb-2"
      />
    </div>
  );
};

export default Field;
