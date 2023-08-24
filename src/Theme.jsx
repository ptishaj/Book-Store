// theme.js
const theme = {
    // ... (other theme properties)
    buttons: {
      contained: {
        borderRadius: '4px',
        padding: '8px 16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
        fontFamily: "'Open Sans', sans-serif",
        
      },
      primary: {
        backgroundColor: 'black',
        color: 'white',
      },
      secondary: {
        backgroundColor: 'white',
        color: 'black',
      },
      primaryHover: {
        backgroundColor: 'green',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
      },
      secondaryHover: {
        backgroundColor: 'green',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
      },  
    },
  };
  
  export default theme;