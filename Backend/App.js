const express = require('express');
const UserRouter=require('./Routes/UserRoutes')
const AdminRouter=require('./Routes/AdminRoutes')
const cors = require('cors');
const connectDB = require('./Config/dbConnection');

const app = express();
app.use(cors());
app.use(express.json());


connectDB();

app.use('/', UserRouter);
app.use('/admin',AdminRouter) ;
const PORT =  8000;

app.listen(PORT, () => {
  console.log('Server is running on port 8000');
});