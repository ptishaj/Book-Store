import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <TextField
      id="search"
      label="Search"
      variant="outlined"
      size="small"
      value={searchTerm}
      onChange={handleSearchChange}
      InputProps={{
        style: {
            color: "black",
            backgroundColor: "white", 
            borderRadius: "20px", 
            fontFamily: "'Montserrat', sans-serif",
        },
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
