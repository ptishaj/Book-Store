import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { useTheme } from './ThemeProvider';
import TextField from '@mui/material/TextField';

const UpdateBook = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [updatedBookName, setUpdatedBookName] = useState('');
  const [updatedBookDescription, setUpdatedBookDescription] = useState('');
  const [updatedBookPrice, setUpdatedBookPrice] = useState('');
  const [updatedBookCategoryId, setUpdatedBookCategoryId] = useState('');
  const [updatedBookBase64Image, setUpdatedBookBase64Image] = useState('');
  const theme = useTheme();

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await axios.get('https://book-e-sell-node-api.vercel.app/api/book/all');
        setBooks(response.data.result);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    }

    fetchBooks();
  }, []);

  const handleEditBook = (book) => {
    setSelectedBook(book);
    setUpdatedBookName(book.name);
    setUpdatedBookDescription(book.description);
    setUpdatedBookPrice(book.price);
    setUpdatedBookCategoryId(book.categoryId);
    setUpdatedBookBase64Image(book.base64image);
  };

  const handleUpdateBook = async () => {
    if (!selectedBook) {
      return;
    }

    const updatedBook = {
      id: selectedBook.id,
      name: updatedBookName,
      description: updatedBookDescription,
      price: updatedBookPrice,
      categoryId: updatedBookCategoryId,
      base64image: updatedBookBase64Image,
    };

    try {
      const response = await axios.put(`https://book-e-sell-node-api.vercel.app/api/book`, updatedBook);
      console.log('Book updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <div className="book-list-container">
      <h2>Book List</h2>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <p>Name: {book.name}</p>
            <p>Category ID: {book.categoryId}</p>
            
            <Button
              variant="contained"
              style={{ ...theme.buttons.primary, marginRight: '10px' }}
              onClick={() => handleEditBook(book)}
            >
              Edit
            </Button>
          </li>
        ))}
      </ul>

      {selectedBook && (
        <div className="edit-book-form">
          <h2>Edit Book</h2>
          <TextField
            label="Name"
            value={updatedBookName}
            onChange={e => setUpdatedBookName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Description"
            value={updatedBookDescription}
            onChange={e => setUpdatedBookDescription(e.target.value)}
            fullWidth
          />
          <TextField
            label="Price"
            value={updatedBookPrice}
            onChange={e => setUpdatedBookPrice(e.target.value)}
            fullWidth
          />
          <TextField
            label="Category ID"
            value={updatedBookCategoryId}
            onChange={e => setUpdatedBookCategoryId(e.target.value)}
            fullWidth
          />
          <TextField
            label="Base64 Image"
            value={updatedBookBase64Image}
            onChange={e => setUpdatedBookBase64Image(e.target.value)}
            fullWidth
          />
          <Button
            variant="contained"
            style={{ ...theme.buttons.primary }}
            onClick={handleUpdateBook}
          >
            Update Book
          </Button>
        </div>
      )}
    </div>
  );
};

export default UpdateBook;
