// src/components/UserData.js

import React, { useState, useEffect } from 'react';

const UserData = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users'); // Adjust this endpoint based on your backend
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      // Handle error (show error message, retry, etc.)
    }
  };

  return (
    <div>
      <h2>User Data</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            Username: {user.username}, Email: {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserData;
