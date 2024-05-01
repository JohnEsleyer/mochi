import React from 'react';
import Link from 'next/link';

function LandingPage() {
  return (
    <div className="bg-gray-800 h-screen">
      <nav className="py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <a href="#" className="text-white text-xl font-bold">
              <h1 className='text-s font-bold'>
                <span className='text-pink-300'>M</span>
                <span className='text-grey-200'>o</span>
                <span className='text-green-300'>c</span>
                <span className='text-yellow-200'>h</span>
                <span className='text-orange-300'>i</span>
                <span> AI</span>
              </h1>
            </a>
          </div>
          <div className="flex space-x-4">
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

        </div>
      </nav>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white">Learn </h1>
        <p className="text-white mt-4">
          Description
        </p>
        {/*  main content here */}
      </div>
    </div>
  );
}

export default LandingPage;
