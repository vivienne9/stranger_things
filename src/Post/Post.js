import { BASE_URL, COHORT_NAME } from "../Api";
import React, { useState } from "react";
import "./Post.css"

const Post = ({ token, posts, setPosts }) => {

  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);
  const [price, setPrice] = useState([]);
  const [location,setLocation] = useState([]);
  // const [willDeliver,setWillDeliver] = useState('')

  return (
    <form id="add-post"
      onSubmit = {async (event) => {
        event.preventDefault();
        try {
        const response = await fetch(`${BASE_URL}${COHORT_NAME}/posts`, {
          method: "POST",
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
              // willDeliver,
            },
          }),
        });

        const json = await response.json();
        console.log(json.data.post);
        const responsePost = json.data.post;
        setPosts([responsePost,...posts]);
        
      }catch (error) {
        console.log(error);
      }
        setTitle("");
        setDescription("");
        setPrice("");
        setLocation("");
      }}
    >
      <input
        placeholder="title"
        value= {title}
        onChange={(event) => setTitle(event.target.value)}
      ></input>
      <input
        placeholder="description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      ></input>
      <input
        placeholder="price"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
      ></input>
      <input
      placeholder="location"
      value={location}
      onChange={(event) => setLocation(event.target.value)}
      ></input>
      {/* <label class = "willDeliver">willDeliver?
      <input
      type ="checkbox"
      value={willDeliver}
      onChange={}
      ></input>
      </label> */}
      <button>Submit</button>
    </form>
  );
};

export default Post