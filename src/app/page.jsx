"use client";

import React from 'react';
import Link from 'next/link';
import 'flowbite';

const HomePage = () => {
  return (
    <div className="bg-gray-900 min-h-screen p-6">
      <div className="container mx-auto">
        {/* Hero Section */}
        <section className="text-center text-white mb-12">
          <h1 className="text-5xl font-bold mb-4">Welcome to Marvel Team Builder</h1>
          <p className="text-xl mb-8">
            Create your ultimate Marvel team, explore characters, and share your favorite combinations!
          </p>
          <Link
            href="/create"
            className="inline-block bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition duration-300"
          >
            Build Your Team
          </Link>
        </section>

        {/* Carousel Section */}
        <section className="mb-12">
          <div id="carousel" className="relative w-full" data-carousel="static">
            <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
              {/* Carousel Items */}
              <div className="hidden duration-700 ease-in-out" data-carousel-item>
                <img
                  src="/img/1%20(1).jpg" // First Image
                  className="absolute block w-full h-full object-cover"
                  alt="Marvel Image 1"
                />
              </div>
              <div className="hidden duration-700 ease-in-out" data-carousel-item>
                <img
                  src="/img/1%20(2).jpg" // Second Image
                  className="absolute block w-full h-full object-cover"
                  alt="Marvel Image 2"
                />
              </div>
              <div className="hidden duration-700 ease-in-out" data-carousel-item>
                <img
                  src="/img/1%20(3).jpg" // Third Image
                  className="absolute block w-full h-full object-cover"
                  alt="Marvel Image 3"
                />
              </div>
            </div>
            {/* Carousel Controls */}
            <button
              type="button"
              className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              data-carousel-prev
            >
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                <span className="sr-only">Previous</span>
              </span>
            </button>
            <button
              type="button"
              className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              data-carousel-next
            >
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
                <span className="sr-only">Next</span>
              </span>
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
          {/* Feature 1 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Explore Characters</h2>
            <p className="mb-6">
              Browse through an extensive list of Marvel characters. Search and learn more about your favorite heroes and villains.
            </p>
            <Link href="/characters" className="text-blue-500 hover:underline">
              View Characters &rarr;
            </Link>
          </div>
          {/* Feature 2 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Create Your Team</h2>
            <p className="mb-6">
              Assemble your dream team by selecting characters and assigning them to positions. Save and manage your teams.
            </p>
            <Link href="/create" className="text-blue-500 hover:underline">
              Build a Team &rarr;
            </Link>
          </div>
          {/* Feature 3 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">View Saved Teams</h2>
            <p className="mb-6">
              Access your saved teams, share them with friends, or make adjustments to create the perfect lineup.
            </p>
            <Link href="/teams" className="text-blue-500 hover:underline">
              My Teams &rarr;
            </Link>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
          <Link
            href="/create"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition duration-300"
          >
            Create Your First Team
          </Link>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
