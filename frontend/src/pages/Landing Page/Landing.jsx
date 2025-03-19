import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen flex flex-col justify-center items-center text-gray-200">
      <header className="text-center mb-10">
        <h1 className="text-5xl font-extrabold mb-4 text-white drop-shadow-lg">
          Welcome to <span className="text-indigo-500">ChatEase</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl">
          Seamlessly connect with your friends and community using ChatEase — your ultimate messaging solution.
        </p>
      </header>
      <div className="flex space-x-6">
        <Link
          to="/signup"
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300"
        >
          Get Started
        </Link>
        <Link
          to="/login"
          className="bg-gray-700 hover:bg-gray-600 text-gray-200 font-semibold py-3 px-8 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300"
        >
          Log In
        </Link>
      </div>
    </div>
  );
}

export default Landing;
