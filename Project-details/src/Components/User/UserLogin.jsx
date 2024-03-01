import { Container, Box, Typography, Button, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { userLogin } from '../../Service/Userapi';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { login, setUserDetails } from '../../Features/setUser';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const UserLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      try {
        userLogin(values)
          .then((response) => {
            console.log(response, '@@@@');
            dispatch(login(values));
            dispatch(setUserDetails(values));
            localStorage.setItem('userToken', response.data.token);
            navigate('/userForm');
          })
          .catch((error) => {
            console.error('Error logging in:', error.message);
          });
      } catch (error) {
        console.error('Error logging in:', error.message);
      }
    },
  });

  return (
    <Container
      maxWidth="sm"
      className="flex justify-center items-center h-screen ">
      <Box className="w-full max-w-md border p-8 rounded-lg shadow-md">
        <Typography variant="h5" className="text-center mb-2 text-blue-600">
          USER LOGIN
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Email Address"
            fullWidth
            margin="normal"
            className="mb-4"
            variant="outlined"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            label="Password"
            fullWidth
            margin="normal"
            type="password"
            className="mb-4"
            variant="outlined"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button type="submit" variant="contained" fullWidth color="primary">
            Sign In
          </Button>
        </form>
        Dont you have an account? <Link to="/userRegister">Register</Link>
      </Box>
    </Container>
  );
};

export default UserLogin;
