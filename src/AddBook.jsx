import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import './AddBook.css';

const AddBook = () => {
  const [newBook, setNewBook] = useState({
    name: '',
    description: '',
    price: 0,
    categoryId: 0,
    base64image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBook(prevBook => ({
      ...prevBook,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    // Validate form fields before adding the book
    if (newBook.name && newBook.description && newBook.price && newBook.categoryId && newBook.base64image) {
      try {
        const response = await fetch('https://book-e-sell-node-api.vercel.app/api/book', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newBook)
        });

        if (response.ok) {
          alert('Book added successfully!');
          // Reset form
          setNewBook({
            name: '',
            description: '',
            price: 0,
            categoryId: 0,
            base64image: ''
          });
        } else {
          alert('Failed to add book.');
        }
      } catch (error) {
        console.error('Error adding book:', error);
        alert('An error occurred while adding the book.');
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="AddBook">
      <h2>Add New Book</h2>
      <div>
        <label>Name: </label>
        <input type="text" name="name" value={newBook.name} onChange={handleChange} />
      </div>
      <div>
        <label>Description: </label>
        <textarea name="description" value={newBook.description} onChange={handleChange} />
      </div>
      <div>
        <label>Price: </label>
        <input type="number" name="price" value={newBook.price} onChange={handleChange} />
      </div>
      <div>
        <label>Category ID: </label>
        <input type="number" name="categoryId" value={newBook.categoryId} onChange={handleChange} />
      </div>
      <div>
        <label>Base64 Image: </label>
        <Input
          type="text"
          name="base64image"
          value={newBook.base64image}
          onChange={handleChange}
        />
      </div>
      <div>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Add Book
        </Button>
      </div>
    </div>
  );
};

export default AddBook;
