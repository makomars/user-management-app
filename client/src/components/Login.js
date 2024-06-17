import React, { useState } from 'react';
import axios from '../axios'; // Correct path to axios.js
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Use navigate hook from react-router-dom

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', formData); // Correct endpoint usage

      if (response.status === 200) {
        const { token, user } = response.data;
        console.log('Login successful:', user);
        localStorage.setItem('token', token);

        if (user.role === 0) {
          navigate('/'); // Navigate to Home
        } else if (user.role === 1) {
          navigate('/dashboard'); // Navigate to Dashboard
        }
      } else {
        setError('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);

      if (error.response && error.response.status === 401) {
        setError('Invalid credentials');
      } else {
        setError('An error occurred during login');
      }
    }
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
            Login
          </button>
          <button type="button" onClick={handleGoBack} className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 mt-2">
            Go Back
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
