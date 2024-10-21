// src/app/teams/page.jsx
"use client";

import React, { useEffect, useState } from 'react';
import TeamCard from '../../components/TeamCard';

const TeamsPage = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch('/teams.json');
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen p-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-6">Saved Teams</h1>
        {teams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        ) : (
          <p className="text-white">No teams found.</p>
        )}
      </div>
    </div>
  );
};

export default TeamsPage;
