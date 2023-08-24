import React from 'react';
import TextField from '@mui/material/TextField';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthService from './AuthService';
import './LoginForm.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';


const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const LoginForm = () => {
  const navigate = useNavigate(); 
  const auth = useAuth();
  return (
    <div className="form-container">
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          const payload = {
            email: values.email,
            password: values.password,
          };

          try {
            const response = await AuthService.login(payload);
            console.log(response);
            toast.success('Login successful!');
            auth.login(response);
            navigate('/');
          } catch (error) {
            console.error('Login failed:', error.response?.data?.message);
            console.error('Error submitting form:', error);
            toast.error('Login failed. Please check your credentials and try again.');
          }
        }}
      >
        {formik => (
          <form onSubmit={formik.handleSubmit}>LoginForm
            <TextField
              id="email"
              name="email"
              label="Email"
              type="email"
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              fullWidth
              margin="normal"
              error={formik.touched.email && !!formik.errors.email}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              variant="outlined"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              fullWidth
              margin="normal"
              error={formik.touched.password && !!formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
            />
            <button type="submit">Login</button>
            <Link to="/contact" className="login-link">
              Don't have an account? Register here
            </Link>
          </form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
