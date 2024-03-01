import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginAdmin, LogoutAdmin, selectAdmin } from '../../Features/setAdmin';
import { useEffect } from 'react';
import { adminHeader } from '../../Service/Adminapi';

const AdminNav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const admin = useSelector(selectAdmin);

  useEffect(() => {
    adminHeader()
      .then((res) => {
        dispatch(LoginAdmin(res.data.admin));
      })
      .catch((error) => {
        console.log('Error fetching user data', error);
      });
  }, [dispatch]);

  const handleLogout = () => {
    navigate('/admin/adminlogin');
    dispatch(LogoutAdmin());
  };

  const handleDetails = () => {
    navigate('/admin/taskupdates');
  };

  const handleUser = () => {
    navigate('/admin/userlist');
  };

  return (
    <nav className="navbar navbar-dark bg-dark">
      <span className="navbar-brand">Task</span>
      <div className="navbar-nav ml-auto">
        {/* <Button
          variant="link"
          className="nav-link text-white"
          onClick={}>
          user
        </Button> */}
        <Button
          variant="link"
          className="nav-link text-white"
          onClick={handleDetails}>
          updates
        </Button>
        <Button
          variant="link"
          className="nav-link text-white"
          onClick={handleUser}>
          Details
        </Button>
        {admin && <span className="nav-link text-white">{admin.email}</span>}
        <Button
          variant="link"
          className="nav-link text-white"
          onClick={handleLogout}>
          <i className="fas fa-sign-out-alt mr-1"></i>
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default AdminNav;
