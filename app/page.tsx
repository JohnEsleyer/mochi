import React from 'react';
import Link from 'next/link';

function LandingPage() {
  return (
    <div className="bg-gray-800 h-screen">
      <nav className="py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <a href="#" className="text-white text-xl font-bold">
              mochi
            </a>
          </div>
          <div className="hidden md:flex space-x-4">
            <Link href="/signup" className="text-white hover:text-gray-300">
              Sign Up
            </Link>
            <Link href="/signin" className="text-white hover:text-gray-300">
              Sign In
            </Link>
            <Link href="/about" className="text-white hover:text-gray-300">
              About
            </Link>
          </div>
          <div className="md:hidden">
            <button className="text-white">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white">Welcome to Mochi</h1>
        <p className="text-white mt-4">
          Description
        </p>
        {/*  main content here */}
      </div>
    </div>
  );
}

export default LandingPage;
