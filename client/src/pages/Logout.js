// src/pages/Logout.js

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {

    const logout = async () => {

      const response = await fetch('http://localhost:3001/logout', {
        credentials: 'include',
      })
      
      const data = await response.json();

      if (response.ok) {
        sessionStorage.removeItem('userID');
        window.location.reload()
        //alert(data.message)         
        navigate('/');
      }
      else {
        alert(data.error)
      }
    };
  
    logout();

  }, [navigate]);

  

  return <div>Logging out...</div>
};

export default Logout;
