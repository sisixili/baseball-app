import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import Home from './pages/Home.js'
import Player from './pages/Player.js'
import Players from './pages/AllPlayers.js'
import Leaderboard from './pages/Leaderboard.js'
import Login from './pages/Login.js'
import Register from './pages/Register.js'

function App() {
  return (
    <div className="App">
      <Router>
        <nav className = "navBar">
        <Link to="/"> Home </Link> | 
        <Link to="/allplayers"> Search All Players | </Link> 
        <Link to="/leaderboard"> Leaderboard </Link> | 
        </nav>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path="/allplayers/:playerID" element={<Player />} />
          <Route path='/allplayers' element={<Players/>} />
          <Route path='/leaderboard' element={<Leaderboard/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
