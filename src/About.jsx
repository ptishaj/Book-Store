import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory
import './About.css';
import Button from '@mui/material/Button';
import { useTheme } from './ThemeProvider';

export const About = () => {
  const theme = useTheme();
  const navigate = useNavigate(); // Get the history object
    
  const handleButtonClick = () => {
    navigate('/'); // Redirect to the home page
  };

  return (
    <div className="AboutContainer">
      <div className="contentWrapper">
        <div className="AboutText">This is About🚶</div>
        <Button variant="contained"style={{ ...theme.buttons.secondary }} onClick={handleButtonClick}>
          Go to Home
        </Button>
      </div>
    </div>
  );
};