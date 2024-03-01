import { Container, Box, Typography, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { userRegister } from '../../Service/Userapi';
import { Link } from 'react-router-dom';

const UserRegister = () => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userRegister(values);
      console.log('User registered successfully');
    } catch (error) {
      console.error('Error registering user:', error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <Container
      maxWidth="sm"
      className="flex justify-center items-center h-screen">
      <Box className="w-full max-w-md border p-8 rounded-lg shadow-md">
        <Typography variant="h5" className="text-center mb-2 text-blue-600">
          USER REGISTER
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            name="username"
            value={values.username}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            label="Email Address"
            fullWidth
            margin="normal"
            name="email"
            value={values.email}
            onChange={handleChange}
            variant="outlined"
          />

          <TextField
            label="phone"
            fullWidth
            margin="normal"
            name="phone"
            value={values.phone}
            onChange={handleChange}
            variant="outlined"
          />

          <TextField
            label="Password"
            fullWidth
            margin="normal"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            label="Confirm Password"
            fullWidth
            margin="normal"
            name="confirmPassword"
            type="password"
            value={values.confirmPassword}
            onChange={handleChange}
            variant="outlined"
          />
          <Button type="submit" variant="contained" fullWidth color="primary">
            Sign Up
          </Button>
        </form>
        Already a member? <Link to="/userlogin">Login</Link>
      </Box>
    </Container>
  );
};

export default UserRegister;
