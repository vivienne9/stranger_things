// import { BASE_URL, COHORT_NAME } from "../Api";
// import React, { useState } from "react";

// const Message = ({token,postIDmessage}) => {

//     const [content,setContent] = useState([]);

//     return (
//         <div> 
//             <form id= "add-message"
//             onSubmit = {async ()=>{
//                 try {
//                   const response = await fetch(
//                     `${BASE_URL}${COHORT_NAME}/posts/${postIDmessage}/messages`,
//                     {
//                       method: "POST",
//                       headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${token}`,
//                       },
//                       body: JSON.stringify({
//                         message: {
//                           content,
//                         },
//                       }),
//                     }
//                   );
            
//                   const json = await response.json();
//                   console.log(json.data.message);
//                   const responseMessage = json.data.message;
//                   setContent(responseMessage);
            
//                 } catch (error) {
//                   console.log("Failed to send message");
//                   console.log(error);}
//                 }}>
//                 <label>Message:</label>
//                 <input 
//                   type="text" 
//                   placeholder ="enter message"
//                   onChange={(event) => setContent(event.target.value)}
//                 ></input>
//                 <button>Submit</button>
//            </form>
//        </div>
//     );
// };
   
// export default Message