import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

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
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label>First Name</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;