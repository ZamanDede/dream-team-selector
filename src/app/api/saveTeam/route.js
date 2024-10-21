// src/app/api/saveTeam/route.js
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request) {
  try {
    const teamData = await request.json();

    // Generate a unique id for the team
    teamData.id = uuidv4();

    // Define the path to teams.json
    const jsonDirectory = path.join(process.cwd(), 'public');
    const filePath = path.join(jsonDirectory, 'teams.json');

    // Read existing teams
    let teams = [];
    try {
      const fileContents = await fs.readFile(filePath, 'utf8');
      teams = JSON.parse(fileContents);
    } catch (err) {
      // If the file doesn't exist, we'll create it
      if (err.code !== 'ENOENT') throw err;
    }

    // Add new team to the array
    teams.push(teamData);

    // Write updated teams back to the file
    await fs.writeFile(filePath, JSON.stringify(teams, null, 2));

    return NextResponse.json({ message: 'Team saved successfully!', id: teamData.id }, { status: 200 });
  } catch (error) {
    console.error('Error saving team:', error);
    return NextResponse.json({ error: 'Failed to save team.' }, { status: 500 });
  }
}
