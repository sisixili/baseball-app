import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import Home from './pages/Home.js'
import People from './pages/People.js'
import Login from './pages/Login.js'
import Register from './pages/Register.js'

function App() {
  return (
    <div className="App">
      <Router>
        <nav className = "navBar">
        <Link to="/"> Home </Link> | 
        <Link to="/people"> See all the people | </Link> 
        <Link to="/login"> Login | </Link> 
        <Link to="/register"> Register </Link> 
        </nav>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/people' element={<People/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;