import { BASE_URL, COHORT_NAME } from "../Api";
import "./Home.css";
import React from "react";
import { Link } from "react-router-dom";
import Post from "../Post/Post";

const Home = ({me,posts, setPosts, token }) => {
  
  // useEffect(() => {   
  const HandleSubmit = async () => {
      try {
        const response = await fetch(`${BASE_URL}${COHORT_NAME}/posts/`);
        const resp = await response.json();
        console.log(resp);
        const respPosts = resp.data.posts;
        setPosts(respPosts);
      } catch (error) {
        console.log("Failed to fetch posts")
        console.log(error);
      }
    }
  // }, []);
  
  return (
    <>
      <header>
        <h3>Hello : {me}</h3>
        <h3>My Posts</h3>
        <button id="fetchpostsbtn" onClick={HandleSubmit}>Fetch Posts</button>
      </header>
      <main>
      <aside>
        <h3>Add Post</h3>
        <Post 
        posts={posts} 
        setPosts={setPosts} 
        token={token} />
        <Link to="/logout">Logout</Link>
      </aside>
      <div id = "posts">
      {
        posts.map(post => {
          return(
            <div className = "myposts" key = {post._id} >
                <h3>{post.title}</h3>
                <span>Description: {post.description}</span>
                <span>Listed By: {post.author.username}</span>
                <span>Posted At: {post.createdAt}</span>
                <span>Located At: {post.location}</span>
                <button id="view">View</button>
            </div>
          )
        })}
      </div>
      </main>
    </>
  );
};

export default Home;
