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
  const [lightMode, setLightMode] = useState(true);

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
    /*const checkLightModeStatus = () => {
      var element = document.body;
      if (lightMode) {
        element.classList.toggle("lmbody");
      } else {
        element.classList.toggle("dmbody");
      }
    };*/

    /* var element = document.body;
  element.classList.toggle("dark-mode"); */

    // Check login status initially
    checkLoggedInStatus();
    /*checkLightModeStatus();*/

    // Listen to storage events to update login status
    window.addEventListener('storage', checkLoggedInStatus);

    return () => {
      window.removeEventListener('storage', checkLoggedInStatus);
    };
    
  }, [/*lightMode*/]);

/*   function lightModeToggle() {
    /*var element = document.body;
    element.classList.toggle("dark-mode");
    if(lightMode === true){
      lightMode = false;
    }else{
      lightMode = true;
    }
  } 
  */


  /**<img className="floatImg" src="batWballTransparent.jpg" alt=""></img>
      <img className="floatBall" src="ball.jpg" alt=""></img> */
  return (
    <div className={lightMode ? 'App' : 'DMApp'}>
      <div className={lightMode ? 'lmbody' : 'dmbody'}>
        {/*<body>*/}
        <Router>
          <div className="NavBar">
            <nav className="navBar">
              <div className="NavText">
                <h3>
                  {" "}
                  {"   "}⚾ <button className="navLinks"><Link class="NavText" to="/home"> Home </Link></button>
                  <button className="navLinks"><Link class="NavText" to="/players"> Search All Players </Link></button>
                  <button className="navLinks"><Link class="NavText" to="/leaderboard"> Leaderboard </Link></button>
                  <button className="navLinks"><Link class="NavText" to="/franchises"> All Franchises </Link></button>
                  <button className="navLinks"><Link class="NavText" to="/standings"> Search Standings </Link></button>
                  <button className="navLinks"><Link class="NavText" to="/favourites"> Favourites </Link></button>
                  {isLoggedIn ? (
                    <button className="navLinks"><Link class="NavText" to="/logout"> Logout </Link></button>
                  ) : (
                    <button className="navLinks"><Link class="NavText" to="/"> Login </Link></button>
                  )}
                  
                  {lightMode ? (
                    <button className="navLinks" onClick={() => setLightMode(false)}>☾</button>
                  ) : (
                    <button className="navLinks" onClick={() => setLightMode(true)}>☼</button>
                  )}
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
            <Route path="/home" element={<Home lightMode={lightMode} setLightMode={setLightMode}/>} />
            <Route path="/players/:playerID" element={<Player lightMode={lightMode} setLightMode={setLightMode}/>} />
            <Route path="/players"
              element={
                <Profiler id="PlayersProfiler" onRender={onRenderCallback}>
                  <Players lightMode={lightMode} setLightMode={setLightMode}/>
                </Profiler>
              }
            />
            <Route path="/franchises/:franchiseID" element={<Franchise lightMode={lightMode} setLightMode={setLightMode}/>} />
            <Route path="/franchises" element={<Franchises lightMode={lightMode} setLightMode={setLightMode}/>} />
            <Route path="/teams/:teamID/:yearID" element={<Team lightMode={lightMode} setLightMode={setLightMode}/>} />
            <Route path="/leaderboard" element={<Leaderboard lightMode={lightMode} setLightMode={setLightMode}/>} />
            <Route path="/" element={<Login lightMode={lightMode} setLightMode={setLightMode}/>} />
            <Route path="/register" element={<Register lightMode={lightMode} setLightMode={setLightMode}/>} />
            <Route path="/logout" element={<Logout lightMode={lightMode} setLightMode={setLightMode}/>} />
            <Route path="/favourites" element={<Favourites lightMode={lightMode} setLightMode={setLightMode}/>} />
            <Route path="/standings" element={<Standings lightMode={lightMode} setLightMode={setLightMode}/>} />
          </Routes>
        </Router>
      {/*</body>*/}
      </div>
    </div>
  ); // <Route path="/players" element={<Players />} />
}

export default App;