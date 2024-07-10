import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import React, { useState, useEffect, Profiler } from 'react';
import Home from './pages/Home.js'
import Player from './pages/Player.js'
import Players from './pages/AllPlayers.js'
import Franchise from './pages/Franchise.js'
import Franchises from './pages/AllFranchises.js'
import Team from './pages/Team.js'
import Leaderboard from './pages/Leaderboard.js'
import Login from './pages/Login.js'
import Register from './pages/Register.js'
import Logout from './pages/Logout.js'
import Favourites from './pages/Favourites.js'
import Standings from './pages/Standings.js'

function onRenderCallback(
  id, // the "id" prop of the Profiler tree that has just committed
  phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
  actualDuration, // time spent rendering the committed update
  baseDuration, // estimated time to render the entire subtree without memoization
  startTime, // when React began rendering this update
  commitTime, // when React committed this update
  interactions // the Set of interactions belonging to this update
) {
  // Log or handle render timings here
  console.log(`Profiler: ${id} - ${phase} phase`);
  console.log(`Actual duration: ${actualDuration}`);
  console.log(`Base duration: ${baseDuration}`);
  console.log(`Start time: ${startTime}`);
  console.log(`Commit time: ${commitTime}`);
}


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


  /**<img className="floatImg" src="batWball.jpg" alt=""></img>
      <img className="floatBall" src="ball.jpg" alt=""></img> */
  return (
    <div className="App">
      <Router>
        <div className="NavBar">
          <nav className="navBar">
            <div className="NavText">
              <h3>
                {" "}
                ⚾ |<Link to="/home"> Home </Link>|
                <Link to="/players"> Search All Players </Link>|
                <Link to="/leaderboard"> Leaderboard </Link>|
                <Link to="/franchises"> All Franchises </Link>|
                <Link to="/standings"> Search Standings </Link>|
                <Link to="/favourites"> Favourites </Link>|
                {isLoggedIn ? (
                  <Link to="/logout"> Logout </Link>
                ) : (
                  <Link to="/"> Login </Link>
                )}
                |
              </h3>
            </div>
          </nav>
        <div>
        {isLoggedIn ? (
                  []
                ) : (
                  "Please login to continue"
                )}
        </div>
        </div>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/players/:playerID" element={<Player />} />
          <Route path="/players"
            element={
              <Profiler id="PlayersProfiler" onRender={onRenderCallback}>
                <Players />
              </Profiler>
            }
          />
          <Route path="/franchises/:franchiseID" element={<Franchise />} />
          <Route path="/franchises" element={<Franchises />} />
          <Route path="/teams/:teamID/:yearID" element={<Team />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/standings" element={<Standings />} />
        </Routes>
      </Router>
    </div>
  ); // <Route path="/players" element={<Players />} />
}

export default App;