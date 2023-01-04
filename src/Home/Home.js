import "./Home.css";
import { BASE_URL, COHORT_NAME } from "../Api";
import React,{useEffect} from "react";
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
    const postId = event.target.getAttribute("postID");

    event.preventDefault();

    try {
      const response = await fetch(
        `${BASE_URL}${COHORT_NAME}/posts/${postId}`,
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
      // const responsePosts = json.data.post;
      // setPosts([responsePosts, ...posts]);

    } catch (error) {
      console.log("Failed to delete post");
      console.log(error);
    }
  };

  const handleEdit = async (event) => {
    const postId = event.target.getAttribute("postID");

    try {
      const response = await fetch(
        `${BASE_URL}${COHORT_NAME}/posts/${postId}`,
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
                  <button id="edit" onClick={handleEdit} postID={post._id}>
                    Edit
                  </button>
                  <button id="delete" onClick={handleDelete} postID={post._id}>
                    Delete
                  </button>
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
