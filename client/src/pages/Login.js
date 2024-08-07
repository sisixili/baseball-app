import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";

function Login({lightMode, setLightMode}) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const login = async () => {
    const token = sessionStorage.getItem("userID");
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
        credentials: 'include', // Important to include credentials
      });

      const data = await response.json();

      if (response.ok) {
        if (data.error) {
          alert(data.error);
        } else {
          sessionStorage.setItem("userID", username);
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
      <input className={lightMode ? "input" : "DMinput"}
        type="text"
        placeholder="Username"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      </div>
      <div className="Centered">
      <input className={lightMode ? "input" : "DMinput"}
        type="password"
        placeholder="Password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      </div>
      <div className="Centered">
        <div className="RegisterFontSize">
          <Link className={lightMode?"tableLinks":"DMtableLinks"} to="/register">New? Register Here</Link>
        </div>
      </div>
      <h3> </h3>
      <div className="center" >
        <button className={lightMode ? "LoginButton" : "dmLoginButton"} onClick={login}>
          Login
        </button>
      </div>
      <h3 className="login-footer"> </h3>
    </div>
  );
}

export default Login;

