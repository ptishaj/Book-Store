import React, { useState } from 'react';
import axios from 'axios';

const AddCategory = () => {
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleAddCategory = async () => {
    if (!newCategoryName) {
      return;
    }

    const newCategory = {
      name: newCategoryName
    };

    try {
      const response = await axios.post('https://book-e-sell-node-api.vercel.app/api/category', newCategory);
      console.log('Category added successfully:', response.data);
      setNewCategoryName(''); // Clear the input field
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <div className="add-category-container">
      <h2>Add New Category</h2>
      <input
        type="text"
        placeholder="Category Name"
        value={newCategoryName}
        onChange={(e) => setNewCategoryName(e.target.value)}
      />
      <button onClick={handleAddCategory}>
        Add Category
      </button>
     
    </div>
  );
};

export default AddCategory;