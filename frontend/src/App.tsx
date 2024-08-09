import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />          
          <Route path='home' element={<Home />} />
          <Route path="pickup_requests" element={<PickupRequests />} />
          <Route path="payments" element={<Payments />} />
          <Route path="help_support" element={<HelpSupport />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;