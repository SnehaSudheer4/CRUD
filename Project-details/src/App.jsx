import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import UserRoute from './Routers/UserRoute';
import AdminRoute from './Routers/AdminRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<UserRoute />} />
        <Route path="/admin/*" element={<AdminRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
