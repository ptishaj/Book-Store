import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { useTheme } from './ThemeProvider';
import { useAuth } from './AuthContext';

const BookList = () => {
  const theme = useTheme();
  const { user } = useAuth(); 
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortMethod, setSortMethod] = useState('');

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await axios.get('https://book-e-sell-node-api.vercel.app/api/book/all');
        setBooks(response.data.result);
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    }

    fetchBooks();
  }, []);

  const handleAddToCart = async (bookId) => {
    try {
      const response = await axios.post('https://book-e-sell-node-api.vercel.app/api/cart',
       {
        bookId: bookId,
        userId: user.result.id,
        quantity: 1,
      });
      
      if (response.data.success) {
        console.log('Book added to cart:', response.data.message);
      } else {
        console.error('Error adding book to cart:', response.data.error);
      }
    } catch (error) {
      console.error('Error adding book to cart:', error.message);
    }
  };

  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = event => {
    setSortMethod(event.target.value);
  };

  const filteredAndSortedBooks = books
    .filter(book =>
      book.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortMethod === 'asc') {
        return a.price - b.price;
      } else if (sortMethod === 'desc') {
        return b.price - a.price;
      }
      return 0;
    });

  return (
    <div className="Home">
      <div className="book-previews">
        <div className="search-and-sort">
          <input
            type="text"
            placeholder="Search by book name"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <select value={sortMethod} onChange={handleSortChange}>
            <option value="">Sort by</option>
            <option value="asc">Price (Low to High)</option>
            <option value="desc">Price (High to Low)</option>
          </select>
        </div>
        {filteredAndSortedBooks.map((book, index) => (
          <div className="book-preview" key={index}>
            <div className="book-details">
              <h1 className="book-title">{book.name}</h1>
              <h3 className="book-author">Author: {book.author}</h3>
              <p className="book-description">{book.description}</p>
              <p className="book-price">₹{book.price}</p>
              <Button variant="contained" style={{ ...theme.buttons.primary }} onClick={() => handleAddToCart(book.id)}>
                Add to Cart
              </Button>
            </div>
            <div className="book-image">
              <img src={book.base64image} alt={`Book ${index}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
