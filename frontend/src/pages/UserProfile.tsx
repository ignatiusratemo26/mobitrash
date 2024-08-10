import React, { useState, useEffect } from 'react';
import api from '../services/api'; // Adjust import based on your file structure
import useAuth from '../hooks/useAuth';

const UserProfile = () => {

  const { currentUser, logout } = useAuth();

  const email = currentUser?.email;

  return (
    <div>
        <h1>User Profile</h1>
        <p>Email: {email}</p>
        <p>First Name: {currentUser?.first_name}</p>
        <p>Last Name: {currentUser?.last_name}</p>
        <p>Phone Number: {currentUser?.phone_number}</p>
        <p>Address: {currentUser?.address}</p>
        <button onClick={logout}>Logout</button>
    </div>
  );
};

export default UserProfile;
