import React from 'react';
import TextField from '@mui/material/TextField';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthService from './AuthService';
import './Form.css';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Form = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const payload = {
        firstName: values.name,
        lastName: 'test', // Replace with desired last name value
        email: values.email,
        roleId: 2,
        password: values.password,
      };

      try {
        const response = await AuthService.Register(payload);
        console.log(response);
        toast.success('Form submitted successfully!');
      } catch (error) {
        console.error('Registration failed:', error.response?.data?.message);
        console.error('Error submitting form:', error);
        toast.error('Error submitting form. Please try again later.');
      }
      console.log(values);
    },
  });

  return (
    <div className="form-container">
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={formik.handleSubmit}
      >
        <form onSubmit={formik.handleSubmit}>
          <TextField
            id="name"
            name="name"
            label="Name"
            variant="outlined"
            value={formik.values.name}
            onChange={formik.handleChange}
            fullWidth
            margin="normal"
            error={formik.touched.name && !!formik.errors.name}
            helperText={formik.touched.name && formik.errors.name}
          />
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
          <button type="submit">Submit</button>
        </form>
      </Formik>
    </div>
  );
};

export default Form;
