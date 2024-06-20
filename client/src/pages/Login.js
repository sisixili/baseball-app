import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const login = async () => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      alert("You have already logged in!");
      navigate("/home");
      return;
    }
    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: username,
          pwd: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.error) {
          alert(data.error);
        } else {
          sessionStorage.setItem("accessToken", data); // Using session storage for quick and dirty JWT auth
          navigate("/home"); // go to home after login
        }
      }
    } catch (error) {
      alert("ERROR", error);
    }

    window.location.reload(); // Refresh page so logout button can show up in navbar
  };



  return (
    <div>
      <div className="pageTitle">
        <h2>Login</h2>
      </div>
      <div className="Centered">
      <input className="input"
        type="text"
        placeholder="Username"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      </div>
      <div className="Centered">
      <input className="input"
        type="password"
        placeholder="Password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      </div>
      <div className="Centered"><Link to="/register">New? Register Here</Link></div>
      <div className="CenteredWithMargins" >
        <button onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;

