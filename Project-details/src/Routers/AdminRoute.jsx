
import AdminNav from '../Components/Admin/AdminNav';
import AdminHomePage from '../Pages/Admin/AdminHomePage';
import AdminLoginPage from '../Pages/Admin/AdminLoginPage';
import { Route, Routes } from 'react-router-dom';
import AdminUserlistPage from '../Pages/Admin/AdminUserlistPage';

const AdminRoute = () => {
  return (
    <div>
      <Routes>
        <Route path="/adminlogin" element={<AdminLoginPage />} />
        <Route path="/taskupdates" element={<AdminHomePage/>}/>
        <Route path="/adminNav" element={<AdminNav/>}/>
        <Route path="/userlist" element={<AdminUserlistPage/>}/>
      </Routes>
    </div>
  );
};

export default AdminRoute;
