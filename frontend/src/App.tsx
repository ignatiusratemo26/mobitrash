import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import HelpSupport from './pages/HelpSupport';
import Payments from './pages/Payments';
import PickupRequests from './pages/PickupRequests';
import useAccounts from './hooks/useAccounts';
import { useState } from 'react';
import useAuth from './hooks/useAuth';
import Register from './pages/Register';
import Login from './pages/Login';

function App () {
  const { currentUser } = useAuth();
  const [registrationToggle, setRegistrationToggle] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        
        {/* Protected routes */}
        <Route path="/" element={ currentUser ? <Layout /> : <Navigate to="/home" /> }>
          <Route index element={<Home />} />          
          <Route path='home' element={<Home />} />
          <Route path="pickup_requests" element={<PickupRequests />} />
          <Route path="payments" element={<Payments />} />
          <Route path="help_support" element={<HelpSupport />} />
        </Route>

        {/* Redirect any unknown paths to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;