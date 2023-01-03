import "./App.css";

import React, { useState,useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Welcome from "./WelcomePage/Welcome";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import Home from "./Home/Home";
// import Logout from "./Logout";

import { myUser } from './Api';
// import { Post } from "./Post";
 
const TOKEN = 'stranger_token';

function App() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('')
  const [me, setMe] = useState('');
  const [posts, setPosts] = useState([]);

  const storeToken =(responseToken) => {   
    localStorage.setItem(TOKEN,responseToken);
    setToken(responseToken)
  }
  
  useEffect (() => {
  const storedToken = localStorage.getItem(TOKEN);
  setToken(storedToken)
  }, [])
  
  const setValue = (func) => {
    return (event) => {func(event.target.value)};
  }

  useEffect(() => {
    if (token) {
      myUser(token)
        .then((me) => {
          setMe(me);
        })
        .catch((error) => {
          console.log(`Failed to fetch me.`);
        });
    }
  })

  // useEffect((respPosts) => {
  //   setPosts(respPosts)
  // }, [posts]);


  return (
    <>
    <Router>
      <Routes>
        <Route 
          exact path="/" 
          element={
            <Welcome
            setPosts={setPosts}
            posts={posts}
            />
          } 
        />
        <Route
          exact path="/login"
          element={
            <Login
              setUsername={setValue(setUsername)}
              setPassword={setValue(setPassword)}
              setToken={setToken}
              username={username}
              password={password}
              token={token}
            />
          }
        />
        <Route
          exact path="/signup"
          element={
            <SignUp
              setUsername={setValue(setUsername)}
              setPassword={setValue(setPassword)}
              setToken={storeToken}
              username={username}
              password={password}
              token={token}
            />
          }
        />
        <Route
          exact path="/home"
          element={
            <Home
            me={me}
            posts={posts}
            setPosts={setPosts}
            token={token}
            />
          }
        />
        {/* <Route
          exact path="/logout"
          element={
            <Logout
            />
          }
        /> */}
      </Routes>
    </Router>
    </>
  );
}

export default App;
