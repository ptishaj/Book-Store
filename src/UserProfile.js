import React from "react";
import { useAuth } from "./AuthContext";
import Button from '@mui/material/Button';
import { useTheme } from './ThemeProvider';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const { user } = useAuth();
  const theme = useTheme();

  if (user) {
    return (
      <div className="UserProfile">
        <h2>User Profile</h2>
        <p>ID: {user.result.id}</p>
        <p>Email: {user.result.email}</p>
        <p>First Name: {user.result.firstName}</p>
        <p>Last Name: {user.result.lastName}</p>
        <p>Role: {user.result.role}</p>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button variant="contained" style={{ ...theme.buttons.primary, marginRight: '10px' }}>
            Home
          </Button>
        </Link>
        <Link to="/Contact" style={{ textDecoration: 'none' }}>
          <Button variant="contained" style={{ ...theme.buttons.primary, marginRight: '10px' }}>
            Edit
          </Button>
        </Link>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default UserProfile;
