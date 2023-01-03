import "./Login.css";
import React from "react";
import { Navigate } from "react-router-dom";
import { BASE_URL, COHORT_NAME } from "../Api";

const Login = ({ username, setUsername, password, setPassword, token,setToken }) => {

  if (!token) {
  return (
    <>
      <form
        id="login"
        onSubmit={async (event) => {
          event.preventDefault();

          try {
            const response = await fetch(
              `${BASE_URL}${COHORT_NAME}/users/login`,
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
            );

            const json = await response.json();
            const responseToken = json.data.token;

            setToken(responseToken);
            console.log("Logged in successfully");
            
          } catch (error) {
            console.log("Failed to login");
            console.log(error);
          }
        }}
      >
        <label>
          Name:
          <input value={username} onChange={setUsername} />
        </label>
        <label>
          Password:
          <input value={password} onChange={setPassword} />
        </label>
        <button id = "submit">Submit</button>
      </form>
    </>
  );}

return (
  <Navigate to="/home" />
)

};

export default Login;
