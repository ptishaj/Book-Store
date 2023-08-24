import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useTheme } from './ThemeProvider';

const AdminDashboard = () => {
  const theme = useTheme();

  return (
    <div className="admin-dashboard">
      <h2> Admin Dashboard</h2>
      <Link to="/addbook" style={{ textDecoration: 'none' }}>
        <Button variant="contained" style={{ ...theme.buttons.primary, marginRight: '10px' }}>
          Add Book
        </Button>
      </Link>
      <Link to="/updatebook" style={{ textDecoration: 'none' }}>
        <Button variant="contained" style={{ ...theme.buttons.secondary }}>
          Edit Book
        </Button>
      </Link>
      <Link to="/deletebook" style={{ textDecoration: 'none' }}>
        <Button variant="contained" style={{ ...theme.buttons.secondary }}>
          Delete Book
        </Button>
      </Link>
      <Link to="/searchuser" style={{ textDecoration: 'none' }}>
        <Button variant="contained" style={{ ...theme.buttons.secondary }}>
          Find and Delete User
        </Button>
      </Link>
      <Link to="/updateuser" style={{ textDecoration: 'none' }}>
        <Button variant="contained" style={{ ...theme.buttons.secondary }}>
          Update User
        </Button>
      </Link>
      <Link to="/addcategory" style={{ textDecoration: 'none' }}>
        <Button variant="contained" style={{ ...theme.buttons.secondary }}>
          AddCategory
        </Button>
      </Link>
      <Link to="/categorylist" style={{ textDecoration: 'none' }}>
        <Button variant="contained" style={{ ...theme.buttons.secondary }}>
        CategoryList
        </Button>
      </Link>
      <Link to="/deletecategory" style={{ textDecoration: 'none' }}>
        <Button variant="contained" style={{ ...theme.buttons.secondary }}>
          DeleteCategory
        </Button>
      </Link>
      {/* Add more dashboard actions here */}
    </div>
  );
};

export default AdminDashboard;
