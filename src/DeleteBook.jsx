import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from './ThemeProvider';

const AdminPage = () => {
  const [books, setBooks] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch('https://book-e-sell-node-api.vercel.app/api/book/all');
        const data = await response.json();
        setBooks(data.result);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    }

    fetchBooks();
  }, []);

  const handleDeleteBook = async (bookId) => {
    try {
      await axios.delete('https://book-e-sell-node-api.vercel.app/api/book', {
        params: { id: bookId },
      });
      toast.success('Book deleted successfully');
      // Update the list of books after deletion
      setBooks(books.filter(book => book.id !== bookId));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div>
      <h2>Admin Page</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.name}</td>
              <td>
              <Button variant="contained" 
         style={{
          
          ...theme.buttons.primary,
          '&:hover': theme.buttons.primaryHover, // Apply hover styles
        }}
       onClick={() => handleDeleteBook(book.id)}>
          Delete Book
        </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;