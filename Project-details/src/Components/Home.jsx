import { Container, Button, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container  maxWidth="sm" className="flex justify-center items-center h-screen">
      <Box border={1} borderRadius={4} p={15} display="flex" flexDirection="column" alignItems="center"  mt={4}>
        <Typography variant="h6"  className="mb-10 font-bold" gutterBottom>
          TASK UPDATION
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/admin/adminlogin">
          Admin
        </Button>
        <Box mt={2}>
          <Button variant="contained" color="secondary" component={Link} to="/userlogin">
            User
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Home;
