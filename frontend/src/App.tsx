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
import UserProfile from './pages/UserProfile';
import PickupRequestCard from './components/PickupRequestCard';

function App () {
  const { currentUser } = useAuth();
  const [registrationToggle, setRegistrationToggle] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/pickup-requests/:id" element={<PickupRequestCard isOpen={false} onClose={function (): void {
          throw new Error('Function not implemented.');
        } } requestId={0} />} />
        
        {/* Protected routes */}
        <Route path="/" element={ currentUser ? <Layout /> : <Navigate to="/home" /> }>
          <Route index element={<Home />} />          
          <Route path='home' element={<Home />} />
          <Route path="pickup-requests" element={<PickupRequests />} />
          <Route path="payments" element={<Payments />} />
          <Route path="support" element={<HelpSupport />} />
          <Route path='profile' element={<UserProfile />} />
        </Route>

        {/* Redirect any unknown paths to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;