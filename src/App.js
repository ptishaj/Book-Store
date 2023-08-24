import React from 'react';
import { BrowserRouter, Route, Routes, Link, Navigate} from 'react-router-dom';
import './App.css';
import { Home } from './Home';
import { Contact } from './Contact';
// import SearchBar from './SearchBar';
import { ToastContainer } from 'react-toastify';
import LoginForm from './LoginForm';
import { AuthProvider } from './AuthContext';
import  BookList  from './BookList';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StyledBadge from '@mui/material/Badge';
import  Cart  from './Cart';
import AddBook from './AddBook';
import UpdateBook from './UpdateBook';
import DeleteBook from './DeleteBook';
import SearchUser from './SearchUser';
import UpdateUser from './UpdateUser';
import Admin from './Admin';
import CategoryList from './CategoryList';
import AddCategory from './AddCategory';
import DeleteCategory from './DeleteCategory';
import UserProfile from './UserProfile';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ path, element }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? element : <Navigate to="/login" />;
};



function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
    <ToastContainer/>
      <div className="App">
        <header className="App-header">
          <div className="header-left">
          
            <Link to="/">Home</Link>
            <Link to="/booklist">Shop</Link>
            <Link to="/admin">Admin</Link>
            <Link to="/profile">Profile</Link>
            
          </div>
          <div className="header-left">
          <img className="header-logo" src="logo 2.jpg" alt="logo" />
          </div>

          {/* <div className="header-right">
            <SearchBar className="search-bar" />
          </div> */}
          <div className="cart-icon">
          <Link to="/cart">
            <IconButton aria-label="cart">
              <StyledBadge badgeContent={1} color="error">
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
          </Link>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/booklist" element={<BookList/>}/>
          <Route
              path="/cart"
              element={<ProtectedRoute element={<Cart />} />}
            />
          
          <Route path="/addbook" element={<AddBook/>}/>
          <Route path="/updatebook" element={<UpdateBook/>}/>
          <Route path="/deletebook" element={<DeleteBook/>}/>
          <Route path="/searchuser" element={<SearchUser />} />
          <Route path="/updateuser" element={<UpdateUser />} />
          <Route path="/admin" element={<ProtectedRoute element={<Admin />} />}/>
          <Route path="/Categorylist" element={<CategoryList/>}/>
          <Route path="/AddCategory" element={<AddCategory/>}/>
          <Route path="/DeleteCategory" element={<DeleteCategory/>}/>
          <Route path="/UserProfile" element={<ProtectedRoute element={<UserProfile/>}/>}/>
           
        </Routes>
        <UserProfile/>
      </div>
      
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
