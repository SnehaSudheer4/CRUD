import { Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getTask } from '../../Service/Userapi';

const Details = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const userTask = async () => {
      try {
        const gettasks = await getTask();
        setTasks(gettasks);
      } catch (error) {
        console.error('Error fetching updated tasks:', error.message);
      }
    };
    userTask();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
  };

  return (
    <Container>
      <Typography variant="h5" align="center">
        All Updates
      </Typography>
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
            {/* <Typography
              variant="h6"
              align="center"
              className="font-bold mb-2 text-green-700">
              {task.name}
            </Typography> */}
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

export default Details;
