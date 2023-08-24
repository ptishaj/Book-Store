// Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#f8f8f8', padding: '20px 0', textAlign: 'center' }}>
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Your App Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
