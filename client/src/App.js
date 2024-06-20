import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import Home from './pages/Home.js'
import Player from './pages/Player.js'
import Players from './pages/AllPlayers.js'
import Leaderboard from './pages/Leaderboard.js'
import Login from './pages/Login.js'
import Register from './pages/Register.js'
import Logout from './pages/Logout.js'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const checkLoggedInStatus = () => {
      const token = sessionStorage.getItem('accessToken');
      if (token) {
        setIsLoggedIn(true);
        console.log("User is logged in, token found.");
      } else {
        setIsLoggedIn(false);
        console.log("User is not logged in, no token found.");
      }
    };

    // Check login status initially
    checkLoggedInStatus();

    // Listen to storage events to update login status
    window.addEventListener('storage', checkLoggedInStatus);

    return () => {
      window.removeEventListener('storage', checkLoggedInStatus);
    };
    
  }, []);

  return (
    <div className="App">
      <Router>
        <div className="NavBar">
          <h3> </h3>
          <nav className = "navBar">
          <Link to="/home">      | Home |</Link> 
          <Link to="/players"> Search All Players |</Link> 
          <Link to="/leaderboard"> Leaderboard |</Link> 
          {isLoggedIn ? (
            <Link to="/logout"> Logout |</Link>
          ):( 
            <Link to="/"> Login |</Link>
          )}
          </nav>
          <h3> </h3>
        </div>
        <Routes>
          <Route path='/home' element={<Home/>} />
          <Route path="/players/:playerID" element={<Player />} />
          <Route path='/players' element={<Players/>} />
          <Route path='/leaderboard' element={<Leaderboard/>} />
          <Route path='/' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/logout' element={<Logout/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
