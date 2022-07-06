//import React, { useEffect, useState } from 'react';
//import { NavLink } from "react-router-dom";
import axios from 'axios';
//import avatar from "../image/avatar.png";
//import InfiniteScroll from "react-infinite-scroll-component"

function Comments({key, commentId, commentUserId, comment, firstName , admin, getComments}) {
    //alert("!!!")
    const token = JSON.parse(localStorage.token);
    const userId = JSON.parse(localStorage.userId);
    //const [newComment, setNewComment] = useState("");

    const deleteComment = () => {
       
        axios({
            method: "DELETE",
            url: `${process.env.REACT_APP_API_URL}api/post/comment/${commentId}`,

            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log("res", res);
            //setPosts(res.data);
            getComments();
           
            if (res.data.error) {
                console.log("ici222", res.data.errors)

            }
        })
            .catch((err) => {
                console.log(err);
            });
    }

 
    return (
        <>
        <div className='comment'>
            <p className='name'>{firstName}</p>
            <p className='text'> {comment}</p>
        
            
        {commentUserId === userId  || admin === 1 ? (
            <li onClick={deleteComment} id="delete_comment" className='active-btn'>Supprimer ce commentaire</li>
        )
            : ("")
        }
        </div>
        </>
    )

}

export default Comments;