import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [updateUser, setUpdateUser] = useState({
    username: '',
    email: '',
    role: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
    fetchUsers();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user info:', error);
      setError('Error fetching user info');
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsersList(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Error fetching users');
    }
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem('token');
      setUserData(null);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleDeleteUser = async (username) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/users/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchUsers(); // After successful delete, fetch updated user list
      alert(`Deleted user ${username} successfully.`);
      setError(null); // Reset error state
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Error deleting user');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateUser({ ...updateUser, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      await axios.post('http://localhost:5000/api/register', newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchUsers(); // After successful add, fetch updated user list
      setNewUser({ username: '', email: '', password: '' }); // Reset the newUser state
      alert('User added successfully.');
      setError(null); // Reset error state
    } catch (error) {
      console.error('Error adding user:', error);
      setError('Error adding user');
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const { username, email, role } = updateUser;

      await axios.put(`http://localhost:5000/api/users/${username}`, { email, role }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchUsers(); // After successful update, fetch updated user list
      setUpdateUser({ username: '', email: '', role: 0 }); // Reset the updateUser state
      alert('User updated successfully.');
      setError(null); // Reset error state
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Error updating user');
    }
  };

  const renderUserList = () => {
    if (!usersList || usersList.length === 0) return <div>No users found</div>;

    return (
      <table className="user-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersList.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role === 1 ? 'Admin' : 'User'}</td>
              <td>
                <button onClick={() => handleDeleteUser(user.username)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Welcome to your Dashboard</h2>
      <p>User Name: {userData.username}</p>
      <p>Email: {userData.email}</p>
      <button onClick={handleLogout}>Logout</button>
      <hr />
      <h3>Add New User</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={newUser.username}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={newUser.password}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">Add User</button>
      </form>
      <hr />
      <h3>Update User</h3>
      <form onSubmit={handleUpdateSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={updateUser.username}
            onChange={handleUpdateInputChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={updateUser.email}
            onChange={handleUpdateInputChange}
            required
          />
        </label>
        <label>
          Role:
          <select name="role" value={updateUser.role} onChange={handleUpdateInputChange} required>
            <option value={0}>User</option>
            <option value={1}>Admin</option>
          </select>
        </label>
        <button type="submit">Update User</button>
      </form>
      <hr />
      <h3>User List</h3>
      {renderUserList()}
    </div>
  );
};

export default Dashboard;
