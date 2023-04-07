import axios from 'axios';
import React, { useState } from 'react';

const SignUpForm = () => {
  const initialState = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: ""
  }

  const [ formData, setFormData] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState("")
  
  const handleChange = (evt)=> {
    const { name, value } = evt.target;
    setFormData(formData => ({
      ...formData, [name]: value
    }))
  }

  const handleSignUp = (evt) => {
    evt.preventDefault();
    axios
    .post("api/signup", formData)
    .then((res)=> {
      // handle successful sign-up
    })
    .catch((error) => {
      setErrorMessage(error.res.data.message);
    });
  };

  return (
    <form onSubmit={handleSignUp}>
      <div>
        <label> First Name: </label>
        <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
        />
      </div>
      <div>
        <label> Last Name: </label>
        <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
        />
      </div>
      <div>
        <label> Username: </label>
        <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
        />
      </div>
      <div>
        <label> Email: </label>
        <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
        />
      </div>
      <div>
        <label> Password: </label>
        <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
        />
      </div>
      <div>
        <button type='submit'> Sign Up</button>
      </div>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  )
}

export default SignUpForm;