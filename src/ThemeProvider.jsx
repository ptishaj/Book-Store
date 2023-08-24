// ThemeProvider.js
import React, { createContext, useContext } from 'react';
import theme from './Theme.jsx'; 

const ThemeContext = createContext(theme);

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}