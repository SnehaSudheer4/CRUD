import {  Route, Routes } from 'react-router-dom';
import UserLoginPage from '../Pages/User/UserLoginPage';
import UserRegisterPage from '../Pages/User/UserRegisterPage';
import FormPage from '../Pages/User/FormPage';
import UserNav from '../Components/User/UserNav';
import Home from '../Components/Home';
import DataPage from '../Pages/User/DataPage';
import UserDataPage from '../Pages/User/UserDataPage';

const UserRoute = () => {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/userlogin" element={<UserLoginPage/>} />
      <Route path="/userRegister" element={<UserRegisterPage/>} />
      <Route path="/userForm" element={<FormPage/>} />
      <Route path="/userData" element={<DataPage/>} />
      <Route path="/userNav" element={<UserNav/>} />
      <Route path="/userDetails" element={<UserDataPage/>} />
      </Routes>
    </div>
  );
}

export default UserRoute;
