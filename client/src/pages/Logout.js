// src/pages/Logout.js

import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Logout = () => {
  const [logoutSuccess, setLogoutSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        const token = sessionStorage.getItem('accessToken');
        if (!token) {
          // If no token is found, redirect to login page
          navigate('/');
          return;
        }

        // Clear session storage
        sessionStorage.removeItem('accessToken');

        // If successful, set logout success to true
        setLogoutSuccess(true);
      } catch (error) {
        // If there is an error, set the error message
        setErrorMessage(error.message);
      }
    };

    logout();
    window.location.reload(); 
  }, [navigate]);

  return (
    <div>
      {logoutSuccess ? (
        <div>
          <p>You have been logged out successfully.</p>
          <Link to="/">Go to login</Link>
        </div>
      ) : (
        <div>
          <p>Logout failed: {errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Logout;
