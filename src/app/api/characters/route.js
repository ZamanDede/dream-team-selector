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

  let offset = 0;
  const limit = 100; // Maximum allowed by Marvel API
  let total = null;
  let allCharacters = [];

  try {
    do {
      const timestamp = new Date().getTime();
      const hash = md5(`${timestamp}${privateKey}${publicKey}`);

      const response = await axios.get('https://gateway.marvel.com/v1/public/characters', {
        params: {
          ts: timestamp,
          apikey: publicKey,
          hash: hash,
          limit: limit,
          offset: offset,
        },
      });

      const data = response.data.data;
      total = data.total;

      const characters = data.results
        .filter((character) => {
          const thumbnail = character.thumbnail;
          // Filter out characters with 'image_not_available' in the thumbnail path
          return (
            thumbnail &&
            thumbnail.path &&
            !thumbnail.path.includes('image_not_available') &&
            thumbnail.extension &&
            !thumbnail.path.includes('4c002e0305708') // Additional check for 'image_not_available'
          );
        })
        .map((character) => ({
          id: character.id,
          name: character.name,
          description: character.description,
          thumbnail: character.thumbnail,
        }));

      allCharacters = allCharacters.concat(characters);

      offset += limit;

      console.log(`Fetched ${offset} of ${total} characters`);

      // Delay to respect rate limits (e.g., 100ms)
      await new Promise((resolve) => setTimeout(resolve, 100));

    } while (offset < total);

    // Path to the public directory
    const filePath = path.join(process.cwd(), 'public', 'characters.json');

    // Write filtered data to the JSON file
    fs.writeFileSync(filePath, JSON.stringify(allCharacters, null, 2));

    console.log(`Saved ${allCharacters.length} characters to characters.json`);

    return NextResponse.json(allCharacters);
  } catch (error) {
    console.error('Failed to fetch Marvel characters:', error);
    return NextResponse.json({ error: 'Failed to fetch Marvel characters' }, { status: error.response?.status || 500 });
  }
}
