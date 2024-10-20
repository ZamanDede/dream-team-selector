// src/components/Navbar.jsx
"use client";

import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link href="/">
            Marvel Dream Team
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link href="/create" className="text-white hover:text-gray-400 transition-colors duration-300">
            Create
          </Link>
          <Link href="/teams" className="text-white hover:text-gray-400 transition-colors duration-300">
            Teams
          </Link>
          <Link href="/characters" className="text-white hover:text-gray-400 transition-colors duration-300">
            Characters
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
