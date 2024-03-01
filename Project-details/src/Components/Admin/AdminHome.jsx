import { useEffect, useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { getUpdate, handleSearch } from '../../Service/Adminapi';

const AdminHome = () => {
  const [tasks, setTasks] = useState([]);
  const [searchDate, setSearchDate] = useState('');

  useEffect(() => {
    fetchUpdatedTask();
  }, []);
  
  const fetchUpdatedTask = async () => {
    try {
      const updatedTask = await getUpdate();
      setTasks(updatedTask);
    } catch (error) {
      console.error('Error fetching updated tasks:', error.message);
    }
  };

  const handleSearchTasks = async () => {
    try {
      const searchedTasks = await handleSearch(searchDate);
      setTasks(searchedTasks); 
    } catch (error) {
      console.error('Error searching tasks:', error.message);
    }
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
  };

  return (
    <Container maxWidth="md" className="mx-auto mt-8">
      <Typography variant="h4" align="center" className="mb-4 text-red-700">
        Updated Tasks
      </Typography>
      <div className="mb-4 flex justify-center">
        <TextField
          label="Search by Date"
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          className="mr-2"
        />
        <Button variant="contained" onClick={handleSearchTasks}>
          Search
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center">
        {tasks.map((task, index) => (
          <div key={task.id} className="border border-gray-900 rounded p-4">
            <Typography
              variant="subtitle1"
              align="center"
              className="font-bold mb-2">
              No {index + 1}
            </Typography>
            <hr className="my-2 " />
            <Typography
              variant="h9"
              align="center"
              className="font-bold mb-2 text-green-700">
              {task.email}
            </Typography>
            <Typography variant="body2" align="center" className="mb-2">
              Date: {formatDate(task.date)}
            </Typography>
            <Typography variant="body2" align="center">
              Details: {task.details}
            </Typography>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default AdminHome;
