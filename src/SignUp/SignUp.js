import "./SignUp.css";
import { BASE_URL, COHORT_NAME } from "../Api";
import React from "react";
import { Navigate } from "react-router-dom";


const SignUp = ({username,setUsername,password,setPassword,setToken,token}) => {

  if (!token) {
  return (
    <div>
      <form id = 'sign-up'
        onSubmit = {async(event)=>{
          event.preventDefault();

          try {
                const response = await fetch(
                  `${BASE_URL}${COHORT_NAME}/users/register`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      user: {
                        username,
                        password,
                      },
                    }),
                  }
                )
                
                const json = await response.json();
                const responseToken = json.data.token;
                setToken(responseToken);
                console.log('Registered successfully');

              } catch (error) {
                console.log('Failed to register');
                console.log(error);
                }  
        }}>
        <label>
          Name:
          <input
            placeholder = 'Enter name'
            value={username}
            onChange={setUsername}
            />
        </label>
        <label >
          Password:
          <input
            placeholder = 'Enter password'
            value={password}
            type = {'password'}
            onChange={setPassword}
          />
        </label>
        <button id = 'submit'>Submit</button>
      </form>
    </div>
  )};  
  
  return (
    <Navigate to="/home" />
  )

};

export default SignUp;
