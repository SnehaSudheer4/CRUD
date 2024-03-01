import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import { editUpdate, userDatas } from '../../Service/Userapi';
import { useSelector } from 'react-redux';
import { selectUser } from '../../Features/setUser';

const Data = () => {
  const [userData, setUserData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const loggedInUserEmail = useSelector(selectUser);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userDatas(loggedInUserEmail);
        setUserData(response);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };
    if (loggedInUserEmail) {
      fetchData();
    }
  }, [loggedInUserEmail]);

  const handleEdit = (index) => {
    const currentDate = new Date();
    const formSubmissionDate = new Date(userData[index].date);
    const timeDifference = currentDate.getTime() - formSubmissionDate.getTime();
    const hoursDifference = timeDifference / (1000 * 60 * 60);

    if (hoursDifference <= 24) {
      setEditIndex(index);
    } else {
      console.log('Edit window expired. Cannot edit form data.');
    }
  };

  const handleSave = async (index) => {
    try {
      const updatedDetailsData = userData[index];
      if (!updatedDetailsData) {
        console.error('No data found for editing.');
        return;
      }
      await editUpdate(updatedDetailsData._id, updatedDetailsData);
      setEditIndex(null);
    } catch (error) {
      console.error('Error updating details:', error.message);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        User Data
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.date}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={user.details}
                      onChange={(e) =>
                        setUserData((prevState) => {
                          const updatedData = [...prevState];
                          updatedData[index].details = e.target.value;
                          return updatedData;
                        })
                      }
                    />
                  ) : (
                    user.details
                  )}
                </TableCell>
                <TableCell>
                  {editIndex === index ? (
                    <Button onClick={() => handleSave(index)}>Save</Button>
                  ) : (
                    <Button onClick={() => handleEdit(index)}>Edit</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Data;
