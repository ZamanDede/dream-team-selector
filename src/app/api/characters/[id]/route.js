// src/app/api/characters/[id]/route.js
import { NextResponse } from 'next/server';
import md5 from 'md5';
import axios from 'axios';

export async function GET(request, { params }) {
  const publicKey = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY;
  const privateKey = process.env.MARVEL_PRIVATE_KEY;

  if (!publicKey || !privateKey) {
    return NextResponse.json({ error: 'Missing API keys' }, { status: 500 });
  }

  const timestamp = new Date().getTime();
  const hash = md5(`${timestamp}${privateKey}${publicKey}`);

  const { id } = params;

  try {
    const response = await axios.get(`https://gateway.marvel.com/v1/public/characters/${id}`, {
      params: {
        ts: timestamp,
        apikey: publicKey,
        hash: hash,
      },
    });

    const characterData = response.data.data.results[0];

    return NextResponse.json(characterData);
  } catch (error) {
    console.error("Failed to fetch Marvel character:", error);
    return NextResponse.json({ error: 'Failed to fetch Marvel character' }, { status: error.response?.status || 500 });
  }
}
