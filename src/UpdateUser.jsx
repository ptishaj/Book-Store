import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const SearchUserById = () => {
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState(null);
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updatedFirstName, setUpdatedFirstName] = useState('');
  const [updatedLastName, setUpdatedLastName] = useState('');
  const [updatedPassword, setUpdatedPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSearchUser = async () => {
    if (!userId) {
      setError('Please enter a user ID');
      return;
    }

    try {
      const response = await axios.get(`https://book-e-sell-node-api.vercel.app/api/user/byId?id=${userId}`);
      const foundUser = response.data.result;

      if (foundUser) {
        setUser(foundUser);
        setUpdatedEmail(foundUser.email);
        setUpdatedFirstName(foundUser.firstName);
        setUpdatedLastName(foundUser.lastName);
        setUpdatedPassword(foundUser.password);
        setError(null);
      } else {
        setUser(null);
        setError('User not found');
      }
    } catch (error) {
      console.error('Error searching for user:', error);
      setUser(null);
      setError('An error occurred while searching for user');
    }
  };

  const handleUpdateUser = async () => {
    if (!user) {
      return;
    }

    const updatedUser = {
      id: user.id,
      email: updatedEmail,
      firstName: updatedFirstName,
      lastName: updatedLastName,
      roleId: user.roleId, // Keep roleId as it is or update as needed
      role: user.role, // Keep role as it is or update as needed
      password: updatedPassword,
    };

    try {
      const response = await axios.put(`https://book-e-sell-node-api.vercel.app/api/user`, updatedUser);
      console.log('User updated successfully:', response.data);
      setError(null);
    } catch (error) {
      console.error('Error updating user:', error);
      setError('An error occurred while updating the user');
    }
  };

  return (
    <div className="search-user-container">
      <h2>Search User By ID</h2>
      <TextField
        label="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        fullWidth
      />
      <Button variant="contained" onClick={handleSearchUser}>
        Search User
      </Button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {user && (
        <div className="user-details">
          <h3>Edit User</h3>
          <TextField
            label="Email"
            value={updatedEmail}
            onChange={(e) => setUpdatedEmail(e.target.value)}
            fullWidth
          />
          <TextField
            label="First Name"
            value={updatedFirstName}
            onChange={(e) => setUpdatedFirstName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Last Name"
            value={updatedLastName}
            onChange={(e) => setUpdatedLastName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Password"
            value={updatedPassword}
            onChange={(e) => setUpdatedPassword(e.target.value)}
            fullWidth
          />
          <Button variant="contained" onClick={handleUpdateUser}>
            Update User
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchUserById;
