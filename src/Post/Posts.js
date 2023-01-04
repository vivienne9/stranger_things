import { BASE_URL, COHORT_NAME } from "../Api";


export const editPost = async ({token,posts,setPosts}) => {

try{
const response = await fetch(`${BASE_URL}${COHORT_NAME}/posts/post_id`, {
  method: "PATCH",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer {token}'
  },
  body: JSON.stringify({
    post: {
      title,
      description,
      price,
      location,
    }
  })
})

const json = response.json();

console.log(json);
setPosts([json]);

}catch(error){
    console.log('Failed to edit');
    console.log(error);
}

}

export const deletePost = async (event) => {
  const postId = event.target.getAttribute("postId");
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
}

