import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register({lightMode, setLightMode}) {

  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    password: '',
  });

  const navigate = useNavigate()

  const handleChange = (e) => { // e is event object (that occurred)
    // extract name and value attributes of element
    const { name, value } = e.target; // e.target is HTML element that triggered e
    setFormData({
      ...formData, // spread operator (shallow copy of formData)
      [name]: value, // dynamically update formData's properties with matching names to new value
    });
  };

  // TODO: add form validation 

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
        const response = await fetch("http://localhost:3001/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userID: formData.username,
                nameFirst: formData.firstName,
                nameLast: formData.lastName,
                pwd: formData.password,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Successfully created new account");
            navigate("/");
        } else {
            alert(data.error || "An error occurred");
        }
    } catch (error) {
        alert("ERROR", error);
        //alert("An error occurred while submitting the form");
    }
};

  return (
    <div className="Register">
      <div className="pageTitle">
        <h2>Register</h2>
      </div>
      <div className="FormSub">
        <form onSubmit={handleSubmit}>
          <div className="regInputs" id="username">
            {/* <ul id="username">
            <li>
            <label>Username</label>
            </li>
            <li> */}
              <input 
                className={lightMode ? "input" : "DMinput"} 
                type="text" 
                name="username" 
                value={formData.username} 
                onChange={handleChange} 
                required
                placeholder="Username"
              />
            {/* </li>
            </ul> */}
          </div>
          <div className="regInputs" id="FirstName">
          {/* <ul id="FirstName">
            <li>
            <label>First Name</label>
            </li>
            <li> */}
            <input 
              className={lightMode ? "input" : "DMinput"} 
              type="text" 
              name="firstName" 
              value={formData.firstName} 
              onChange={handleChange} 
              required 
              placeholder="First Name"
            />
            {/* </li>
            </ul> */}
          </div>
          <div className="regInputs" id="LastName">
          {/* <ul id="LastName">
            <li>
            <label>Last Name</label>
            </li>
            <li> */}
            <input 
              className={lightMode ? "input" : "DMinput"} 
              type="text" 
              name="lastName" 
              value={formData.lastName} 
              onChange={handleChange} 
              required 
              placeholder="Last Name"
            />
            {/* </li>
            </ul> */}
          </div>
          <div className="regInputs" id="Password">
          {/* <ul id="Password">
            <li>
            <label>Password</label>
            </li>
            <li> */}
            <input 
              className={lightMode ? "input" : "DMinput"} 
              type="password" 
              placeholder="Password"
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
            />
{/*             </li>
            </ul> */}
          </div>
          <h2> </h2>
          <div className="center">
            <button className={lightMode ? "RegCenteredWithMargins" : "DMRegCenteredWithMargins"} type="submit">Register</button>
          </div>
        </form>
      </div>
      <h4 className="reg-footer"> </h4>
    </div>
  );
}

export default Register;