import {  useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from '../../Features/setUser';
import { useEffect } from 'react';
import { userHeader } from '../../Service/Userapi';

const UserNav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    userHeader()
      .then((res) => {
        dispatch(login(res.data.user));
      })
      .catch((error) => {
        console.log('Error fetching user data', error);
      });
  }, [dispatch]);

  const handleLogout = () => {
    navigate('/Userlogin');
    dispatch(logout());
  };

  const handleTask = () => {
    navigate('/UserData');
  };
  const handleForm = () => {
    navigate('/userForm');
  };
  const handleDetails = () => {
    navigate('/userDetails');
  };

  return (
    <nav className="navbar navbar-dark bg-dark">
    <span className="navbar-brand">Task</span>
    <div className="navbar-nav ml-auto">
      <Button variant="link" className="nav-link text-white" onClick={handleTask}>
        Task
      </Button>
      <Button variant="link" className="nav-link text-white" onClick={handleForm}>
        Form
      </Button>
      <Button variant="link" className="nav-link text-white" onClick={handleDetails}>
       Details
      </Button>
      {user && (
        <span className="nav-link text-white">
          {user.email}
        </span>
      )}
      <Button variant="link" className="nav-link text-white" onClick={handleLogout}>
        <i className="fas fa-sign-out-alt mr-1"></i>
        Logout
      </Button>
    </div>
  </nav>
  );
};
export default UserNav;

// import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import Offcanvas from 'react-bootstrap/Offcanvas';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function OffcanvasExample() {
//   return (
//     <>
//       {[false,  'md', 'lg', 'xl', 'xxl'].map((expand) => (
//         <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
//           <Container fluid>
//             <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
//             <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
//             <Navbar.Offcanvas
//               id={`offcanvasNavbar-expand-${expand}`}
//               aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
//               placement="end"
//             >
//               <Offcanvas.Header closeButton>
//                 <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
//                   Offcanvas
//                 </Offcanvas.Title>
//               </Offcanvas.Header>
//               <Offcanvas.Body>
//                 <Nav className="justify-content-end flex-grow-1 pe-3">
//                   <Nav.Link href="#action1">Home</Nav.Link>
//                   <Nav.Link href="#action2">Link</Nav.Link>
//                   <NavDropdown
//                     title="Dropdown"
//                     id={`offcanvasNavbarDropdown-expand-${expand}`}
//                   >
//                     <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
//                     <NavDropdown.Item href="#action4">
//                       Another action
//                     </NavDropdown.Item>
//                     <NavDropdown.Divider />
//                     <NavDropdown.Item href="#action5">
//                       Something else here
//                     </NavDropdown.Item>
//                   </NavDropdown>
//                 </Nav>
//                 <Form className="d-flex">
//                   <Form.Control
//                     type="search"
//                     placeholder="Search"
//                     className="me-2"
//                     aria-label="Search"
//                   />
//                   <Button variant="outline-success">Search</Button>
//                 </Form>
//               </Offcanvas.Body>
//             </Navbar.Offcanvas>
//           </Container>
//         </Navbar>
//       ))}
//     </>
//   );
// }

// export default OffcanvasExample;