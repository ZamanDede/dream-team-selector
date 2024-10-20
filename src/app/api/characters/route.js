// src/app/api/characters/route.js
import { NextResponse } from 'next/server';
import md5 from 'md5';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const publicKey = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY;
  const privateKey = process.env.MARVEL_PRIVATE_KEY;

  if (!publicKey || !privateKey) {
    return NextResponse.json({ error: 'Missing API keys' }, { status: 500 });
  }

  const timestamp = new Date().getTime();
  const hash = md5(`${timestamp}${privateKey}${publicKey}`);

  try {
    const response = await axios.get(`https://gateway.marvel.com/v1/public/characters`, {
      params: {
        ts: timestamp,
        apikey: publicKey,
        hash: hash,
        limit: 20,
      },
    });

    const filteredCharacters = response.data.data.results.map((character) => ({
      id: character.id,
      name: character.name,
      description: character.description,
      thumbnail: character.thumbnail,
    }));

    // Path to the public directory
    const filePath = path.join(process.cwd(), 'public', 'characters.json');

    // Write filtered data to the JSON file
    fs.writeFileSync(filePath, JSON.stringify(filteredCharacters, null, 2));

    return NextResponse.json(filteredCharacters);
  } catch (error) {
    console.error("Failed to fetch Marvel characters:", error);
    return NextResponse.json({ error: 'Failed to fetch Marvel characters' }, { status: error.response?.status || 500 });
  }
}
