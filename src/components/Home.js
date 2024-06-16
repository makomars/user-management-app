// src/components/Home.js

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if a token exists in local storage to determine if the user is logged in
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    // Navigate to the home page or any other page after logging out
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        {isLoggedIn && <h1 className="text-2xl font-bold mb-4">Welcome to My App User</h1>}
        <div className="space-y-4">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="block text-center bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/register" className="block text-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Register
              </Link>
              <Link to="/login" className="block text-center bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
