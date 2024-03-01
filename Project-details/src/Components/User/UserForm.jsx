import { Container, Box, Typography } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { taskUpdate } from '../../Service/Userapi';
import { useSelector } from 'react-redux';
import { selectUser } from '../../Features/setUser';

const UserForm = () => {
  const loggedInUser = useSelector(selectUser);

  const initialValues = {
    name: '',
    date: new Date().toISOString().split('T')[0], 
    details: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    date: Yup.date().required('Date is required'),
    details: Yup.string().required('Details are required'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      values.email = loggedInUser.email;
      await taskUpdate(values);
      console.log('Task updated successfully');
      resetForm();
    } catch (error) {
      console.error('Error:', error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm" className="flex justify-center items-center h-screen">
      <Box className="w-full max-w-md border p-8 rounded-lg shadow-md">
        <Typography variant="h4" className="text-center text-black mb-2">
          Updations
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              <div className="mb-4">
                <label  className="block text-sm font-bold text-gray-700 mb-1">
                  Date
                </label>
                <Field
                  type="date"
                  id="date"
                  name="date"
                  value={initialValues.date} 
                  disabled 
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
                <ErrorMessage
                  name="date"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              <div className="mb-9">
                <label  className="block text-sm font-bold text-gray-700 mb-1">
                  Updations
                </label>
                <Field
                  as="textarea"
                  id="details"
                  name="details"
                  placeholder="Enter your updation"
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
                <ErrorMessage
                  name="details"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              <Box>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-lg bg-blue-300 border-none px-4 py-3 text-s">
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default UserForm;



