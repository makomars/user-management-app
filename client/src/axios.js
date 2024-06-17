// src/axios.js

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust baseURL based on your backend URL
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
