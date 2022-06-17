import React, { useEffect, useState } from 'react';
import { NavLink, renderMatches } from "react-router-dom";
import axios from 'axios';
import avatar from "../image/avatar.png";
import Comments from './Comments';

import Poster from './Poster';


const Posts = ({ key, message, date, firstName, postId, postUserId }) => {

    
   // console.log(postUserId)
    const token = JSON.parse(localStorage.token)
    const userId = JSON.parse(localStorage.userId)
    const [posts, setPosts] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [activUser, SetActivUser] = useState(false);
    const [comments, setComments] = useState([]);
   
    

    const deletePost = () => {
        axios({
            method: "DELETE",
            url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,

            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log("res", res);
            setPosts(res.data);
            console.log(res.data);
            setTotalItems(res.data.length);
            console.log(totalItems)
            if (res.data.error) {
                console.log("ici222", res.data.errors)

            }
        })
            .catch((err) => {
                console.log(err);
            });
    }


    const getComments =  () => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
        }).then((res) => {
            console.log("res", res);
            console.log("test", postId)
            setComments(res.data);
            console.log(res.data);
            //setTotalItems(res.data.length);
            //console.log(totalItems)
            if (res.data.error) {
                console.log("ici222", res.data.errors)

            }
        })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        
            <div className="post-container">

                <p>{firstName}</p>
                <p> {message}</p>
                <li onClick={getComments} id="get-comment" className='active-btn'>afficher les commentaires</li>
               
                <div className='comment-container'>
                
                    {comments.map((comments) =>(
                        <Comments
                            key ={comments.id}
                            comment = {comments.comment}

                           /> 
                        ))}
                </div>
                
               
                {postUserId === userId ? (
                    <li onClick={deletePost} id="delete_post" className='active-btn'>Supprimer</li>
                )
                    : ("")
                }
                <br />
            </div>
     


    )
            }



export default Posts;