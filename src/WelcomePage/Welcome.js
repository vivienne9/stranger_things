import "./Welcome.css"
import { BASE_URL, COHORT_NAME } from "../Api";
import React,{useEffect} from "react";
import {Link } from "react-router-dom";

const Welcome = ({posts,setPosts}) => {

  useEffect(() => {
    try {
      async function fetchPosts() {
        const response = await fetch(
          `${BASE_URL}${COHORT_NAME}/posts`
        );
        const resp = await response.json();
        console.log(resp)
        const respPosts = resp.data.posts;
        setPosts(respPosts);   
      }
      fetchPosts();

    }catch (error) {
      console.log(error);
    }
  }, [posts]);

  return (
    <>
        <header id='header'>
            <h1 id = 'posts'>Posts</h1>
            <Link to="/login">Login</Link>
            <Link to="/signup">SignUp</Link>
        </header>  
      {
        posts.map(post => {
          return(
            <div className = 'posts' key = {post._id} >
                <h3>{post.title}</h3>
                <p>Description: {post.description}</p>
            </div>
          )
        })}
    </>
  )
}

export default Welcome;
