import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuth } from './AuthContext';

const BookList = () => {
  const { user } = useAuth();
  const [userCart, setUserCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    async function fetchUserCart() {
      try {
        if (user && user.result) {
          const response = await axios.get(`https://book-e-sell-node-api.vercel.app/api/cart?userId=${user.result.id}`);
          console.log('User cart response:', response.data);
          if (response.data.key === 'SUCCESS') {
            setUserCart(response.data.result || []);
            calculateTotalPrice(response.data.result || []);
          } else {
            console.error('Error fetching user cart:', response.data.error);
          }
        }
      } catch (error) {
        console.error('Error fetching user cart:', error);
      }
    }

    fetchUserCart();
  }, [user]);

  const calculateTotalPrice = (cartItems) => {
    const totalPrice = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.book.price, 0);
    setTotalPrice(totalPrice);
  };

  const handleDeleteCartItem = async (cartItemId) => {
    try {
      const response = await axios.delete(`https://book-e-sell-node-api.vercel.app/api/cart?id=${cartItemId}`);
      console.log('Delete response:', response.data);
      if (response.data.key === 'SUCCESS') {
        setUserCart(prevCart => prevCart.filter(item => item.id !== cartItemId));
        calculateTotalPrice(userCart.filter(item => item.id !== cartItemId));
        toast.success('Item removed from cart.');
      } else {
        console.error('Error deleting cart item:', response.data.error);
      }
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  const handlePlaceOrder = () => {
    if (userCart.length === 0) {
      toast.warning("Can't place order. Cart is empty.");
      return;
    }

    // Implement order placement logic here
    toast.success('Order placed successfully!');
  };

  return (
    <div className="Home">
      <div className="book-previews">
        <div className="user-cart">
          <h2>Your Cart</h2>
          {userCart.map((cartItem) => (
            <div key={cartItem.id} className="cart-book">
              <div className="cart-book-image">
                <img src={cartItem.book.base64image} alt={`Book ${cartItem.id}`} />
              </div>
              <div className="cart-book-details">
                <p>{cartItem.book.name}</p>
                <p>Quantity: {cartItem.quantity}</p>
                <p>Price: ₹{cartItem.book.price}</p>
                <button onClick={() => handleDeleteCartItem(cartItem.id)}>Delete</button>
              </div>
            </div>
          ))}
          {userCart.length > 0 && (
            <div className="cart-total">
              <p>Total Price: ₹{totalPrice}</p>
              <button onClick={handlePlaceOrder}>Place Order</button>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BookList;
