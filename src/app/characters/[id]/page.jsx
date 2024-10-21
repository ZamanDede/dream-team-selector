// src/app/characters/[id]/page.jsx
"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const CharacterDetailPage = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(`/api/characters/${id}`);
        const data = await response.json();
        if (response.ok) {
          setCharacter(data);
        } else {
          console.error('Character not found');
        }
      } catch (error) {
        console.error('Error fetching character:', error);
      }
    };

    fetchCharacter();
  }, [id]);

  if (!character) {
    return (
      <div className="bg-gray-900 min-h-screen p-4">
        <div className="container mx-auto">
          <p className="text-white">Loading character...</p>
        </div>
      </div>
    );
  }

  // Helper function to get image URL
  const getImageUrl = (thumbnail) => {
    if (!thumbnail) return '';
    return `${thumbnail.path}.${thumbnail.extension}`;
  };

  return (
    <div className="bg-gray-900 min-h-screen p-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-white mb-6">{character.name}</h1>
        <img
          src={getImageUrl(character.thumbnail)}
          alt={character.name}
          className="w-full max-w-md mx-auto rounded mb-4"
        />
        <p className="text-gray-400 mb-4">{character.description || 'No description available.'}</p>

        {/* Comics */}
        <h2 className="text-2xl font-bold text-white mt-6 mb-2">Comics</h2>
        {character.comics.items.length > 0 ? (
          <ul className="list-disc list-inside text-gray-400">
            {character.comics.items.map((comic, index) => (
              <li key={index}>{comic.name}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No comics available.</p>
        )}

        {/* Series */}
        <h2 className="text-2xl font-bold text-white mt-6 mb-2">Series</h2>
        {character.series.items.length > 0 ? (
          <ul className="list-disc list-inside text-gray-400">
            {character.series.items.map((series, index) => (
              <li key={index}>{series.name}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No series available.</p>
        )}

        {/* Stories */}
        <h2 className="text-2xl font-bold text-white mt-6 mb-2">Stories</h2>
        {character.stories.items.length > 0 ? (
          <ul className="list-disc list-inside text-gray-400">
            {character.stories.items.map((story, index) => (
              <li key={index}>{story.name}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No stories available.</p>
        )}
      </div>
    </div>
  );
};

export default CharacterDetailPage;
