// src/components/TeamCard.jsx
import React from 'react';
import Link from 'next/link';

const TeamCard = ({ team }) => {
  return (
    <div className="bg-gray-800 p-4 rounded shadow-md">
      <h2 className="text-2xl font-bold text-white mb-2">{team.teamName}</h2>
      <p className="text-gray-400 mb-4">Created on: {new Date(team.timestamp).toLocaleString()}</p>
      <Link
        href={`/teams/${team.id}`}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 inline-block"
      >
        View Team
      </Link>
    </div>
  );
};

export default TeamCard;
