import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Grid,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { setAdminDetails } from '../../Features/setAdmin';
import { adminLogin } from '../../Service/Adminapi';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (adminData) => {
      try {
        const response = await adminLogin(adminData);
        const responseData = response.data;
        console.log('Response data:', responseData);
        if (responseData && responseData.status) {
          dispatch(setAdminDetails(adminData));
          localStorage.setItem('adminToken', responseData.token);
          navigate('/admin/taskupdates');
        }
      } catch (error) {
        console.error('Login failed:', error.message);
      }
    },
  });

  return (
    <Container
      maxWidth="sm"
      className="flex justify-center items-center h-screen">
      <Box className="w-full max-w-md border p-8 rounded-lg shadow-md">
        <Typography variant="h5" className="text-center mb-2 text-blue-600">
          ADMIN LOGIN
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Email Address"
                fullWidth
                margin="normal"
                variant="outlined"
                {...formik.getFieldProps('email')}
                error={formik.touched.email && formik.errors.email}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                fullWidth
                margin="normal"
                type="password"
                variant="outlined"
                {...formik.getFieldProps('password')}
                error={formik.touched.password && formik.errors.password}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                color="primary">
                Sign In
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default AdminLogin;
