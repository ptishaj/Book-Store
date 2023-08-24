import React, { useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useTheme } from './ThemeProvider';
import UserGreeting from './UserGreeting';

export const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [books] = useState([
    {
      title: 'Book Title 1',
      
      description:
        'Reading is the best for get ideas',
        author: 'Start Reading....',
      imageSrc: 'background3.jpg',
    },
    // {
    //   title: 'Book Title 2',
    //   author: 'Author Name 2',
    //   description:
    //     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, nostrum assumenda consectetur...',
    //   imageSrc: 'logo192.png',
    // },
    // Add more books as needed
  ]);

  const handleButtonClick = () => {
    navigate('/booklist');
  };

  return (
    <div className="Home">
      <div className="book-previews">
        {books.map((book, index) => (
          <div className="book-preview" key={index} style={{ backgroundImage: `url(${book.imageSrc})` }}>
            <div className="book-details">
              <h1 className="book-title"><UserGreeting/></h1>
              <h3 className="book-description">{book.description}</h3>
              <p className="book-author">{book.author}</p>
              <Button variant="contained" style={{ ...theme.buttons.primary }} onClick={handleButtonClick}>
                Buy now
              </Button>
            </div>
            {/* No need for the book image here */}
          </div>
        ))}
      </div>
    </div>
  );
};
