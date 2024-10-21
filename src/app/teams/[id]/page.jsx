// src/app/teams/[id]/page.jsx
"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';

const TeamDetailPage = () => {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [currentURL, setCurrentURL] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentURL(window.location.href);
    }
  }, []);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await fetch('/teams.json');
        const data = await response.json();
        const foundTeam = data.find((t) => t.id === id);
        if (foundTeam) {
          setTeam(foundTeam);
        } else {
          console.error('Team not found');
        }
      } catch (error) {
        console.error('Error fetching team:', error);
      }
    };

    fetchTeam();
  }, [id]);

  if (!team) {
    return (
      <div className="bg-gray-900 min-h-screen p-4">
        <div className="container mx-auto">
          <p className="text-white">Loading team...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen p-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-white mb-6">{team.teamName}</h1>
        <p className="text-gray-400 mb-4">Created on: {new Date(team.timestamp).toLocaleString()}</p>
        <Link href="/teams" className="text-blue-500 hover:underline mb-4 inline-block">
          &larr; Back to Teams
        </Link>
        {/* Share buttons */}
        <div className="flex items-center space-x-4 my-4">
          <FacebookShareButton url={currentURL} quote={`Check out my Marvel team: ${team.teamName}`}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton url={currentURL} title={`Check out my Marvel team: ${team.teamName}`}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <WhatsappShareButton url={currentURL} title={`Check out my Marvel team: ${team.teamName}`}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </div>
        {/* Display team details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {team.fieldCharacters.map((character) => (
            <div key={character.id} className="bg-gray-800 p-4 rounded shadow-md">
              <img
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
                className="w-full h-48 object-cover rounded mb-2"
              />
              <h2 className="text-xl font-bold text-white">{character.name}</h2>
              <p className="text-gray-400">Position: {character.position.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamDetailPage;
