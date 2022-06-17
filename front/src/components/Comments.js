import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import avatar from "../image/avatar.png";
//import InfiniteScroll from "react-infinite-scroll-component"

function Comments({key, comment}) {
//alert("!!!")
const token = JSON.parse(localStorage.token);
const userId = JSON.parse(localStorage.userId);
const [newComment, setNewComment] = useState("");

       const createComment = (e) =>{
       
            e.preventDefault();
            if(!comment ){
                console.log("No message!")
                return
            }else{
            axios ({
                method: "POST",
                url: `${process.env.REACT_APP_API_URL}api/post/`,
                data: {
                    userId : userId,
                    comment: comment,
                },
                headers:{
                    authorization:`Bearer ${token}`
                }
            }).then((res) => {
                console.log(res);
                setNewComment(res.data.message)
                //info.getAllPosts();
                if (res.data.error) {
                    console.log("ici222",res.data.errors)
                } 
              })
              .catch((err) => {
                console.log(err);
              });
            }
        }
       
    return(
    <>
       <p> {comment}</p>
     
     
       <form>
                <input type="text" name="post" id='post' placeholder="Commenter" onChange={(e) => setNewComment
                (e.target.value)} value={newComment}></input>
                <li onClick={createComment} id="create-post" className="active-btn">Commenter</li>
        </form>
    </>
       
    )
    
}

export default Comments;