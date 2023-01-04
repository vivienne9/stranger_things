import "./Home.css";
import { BASE_URL, COHORT_NAME } from "../Api";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Post from "../Post/Post";

const Home = ({
  me,
  posts,
  setPosts,
  token,
  title,
  description,
  price,
  location,
}) => {
  const [content, setContent] = useState([]);

  const fetchposts = async () => {
    try {
      const response = await fetch(`${BASE_URL}${COHORT_NAME}/posts/`);
      const json = await response.json();
      console.log(json);
      const respPosts = json.data.posts;
      setPosts(respPosts);
    } catch (error) {
      console.log("Failed to fetch posts");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchposts();
  }, [posts]);

  const handleDelete = async (event) => {
    const postIDdelete = event.target.getAttribute("postIDdelete");

    event.preventDefault();

    try {
      const response = await fetch(
        `${BASE_URL}${COHORT_NAME}/posts/${postIDdelete}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log("Failed to delete post");
      console.log(error);
    }
  };

  const handleEdit = async (event) => {
    const postIDedit = event.target.getAttribute("postIDedit");

    try {
      const response = await fetch(
        `${BASE_URL}${COHORT_NAME}/posts/${postIDedit}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            post: {
              title,
              description,
              price,
              location,
            },
          }),
        }
      );

      const json = await response.json();
      console.log(json.data.post);
      const responsePost = json.data.post;
      setPosts([responsePost, ...posts]);
    } catch (error) {
      console.log("Failed to edit");
      console.log(error);
    }
  };

  const handleMessage = (event) => {
    const postIDmessage = event.target.getAttribute("postIDmessage");

    return (
      <div>
        <form
          id="add-message"
          onSubmit ={ async () => {
            try {
              const response = await fetch(
                `${BASE_URL}${COHORT_NAME}/posts/${postIDmessage}/messages`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({
                    message: {
                      content,
                    },
                  }),
                }
              );

              const json = await response.json();
              console.log(json.data.message);
              const responseMessage = json.data.message;
              setContent([responseMessage]);
            } catch (error) {
              console.log("Failed to send message");
              console.log(error);
            }
          }}
        >
          <label>Message:</label>
          <input
            type="text"
            placeholder="enter message"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          ></input>
          <button>Submit</button>
        </form>
      </div>
    );
  };

  return (
    <>
      <header>
        <h3>Hello : {me}</h3>
        <h3>Posts</h3>
        {/* <button id="fetchposts" onClick={HandleSubmit}>
          Fetch Posts
        </button> */}
      </header>
      <main>
        <aside>
          <h3>Add Post</h3>
          <Post posts={posts} setPosts={setPosts} token={token} />
          <Link to="/logout">Logout</Link>
        </aside>
        <div id="posts">
          {posts.map((post) => {
            return (
              <div className="myposts" key={post._id}>
                <h3>{post.title}</h3>
                <span>Description: {post.description}</span>
                <span>Posted At: {post.createdAt}</span>
                <span>Located At: {post.location}</span>
                <div id="postbtn">
                  <button id="edit" onClick={handleEdit} postIDedit={post._id}>
                    Edit
                  </button>
                  <button
                    id="delete"
                    onClick={handleDelete}
                    postIDdelete={post._id}
                  >
                    Delete
                  </button>
                  <button
                    id="message"
                    onClick={handleMessage}
                    postIdmessage={post._id}
                  >
                    Message
                  </button>
                  {/* <Message postIdmesg={postIdmesg} setPostIdmesg={postIdmesg}/> */}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default Home;
