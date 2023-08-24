import React from 'react'
import Form from './Form';
import { useFormAction } from 'react-router-dom';

// import "./Contact.css"
export const Contact = () => {
  return (
    <div className="ContactContainer" style={{
      backgroundColor: '#f2f2f2',
      padding: '20px',
      margin: 'auto',
      textAlign: 'center',
      fontSize: '24px',
      fontWeight: 'bold',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    }}>REGISTRATION FORM 
    <Form/>
    </div>
  )
}