import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://book-e-sell-node-api.vercel.app/api/category/all');
      setCategories(response.data.result);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDeleteCategory = async (categoryId) => {
    try {
      const response = await axios.delete(`https://book-e-sell-node-api.vercel.app/api/category?id=${categoryId}`);
      console.log('Category deleted successfully:', response.data);
      fetchCategories(); // Refresh categories after deletion
    } catch (error) {
      console.error('Error deleting category:', error.response?.data);
    }
  };

  return (
    <div className="category-list-container">
      <h2>Category List</h2>
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            Name: {category.name}
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleDeleteCategory(category.id)}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
