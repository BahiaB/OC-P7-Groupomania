import React, { useEffect, useState } from 'react';
import { NavLink, renderMatches } from "react-router-dom";
import axios from 'axios';
import avatar from "../image/avatar.png";
import Comments from './Comments';
import Home from '../pages/Home'
//import { getPostUser } from '../Utils/utils';
import Poster from './Poster';


const Posts = ({ key, message, date, posterName, postId, postUserId }) => {

    
   // console.log(postUserId)
    const token = JSON.parse(localStorage.token)
    const userId = JSON.parse(localStorage.userId)

    const [posts, setPosts] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [activUser, SetActivUser] = useState(false);
    const [comments, setComments] = useState([]);
   
    //const token = JSON.parse(localStorage.token);
   // const userId = JSON.parse(localStorage.userId);
    const [newComment, setNewComment] = useState("");
    const [postUser, setPostUser] = useState([]);
   // const [comment, setComment] = useState([])

   //const postUserName= () =>{
    //getPostUser(postUserId);
   // setPostUser([getPostUser(postUserId)])

  // }

   
    
   const createComment = (e) => {

        e.preventDefault();
       
            axios({
                method: "POST",
                url: `${process.env.REACT_APP_API_URL}api/post/comment`,
                data: {
                    userId: userId,
                    comment: newComment,
                    postId: postId,
                },
                headers: {
                    authorization: `Bearer ${token}`
                }
            }).then((res) => {
                console.log(res);
                setNewComment(res.data.message)
                getComments();
                //info.getAllPosts();
                if (res.data.error) {
                    console.log("ici222", res.data.errors)
                }
            })
                .catch((err) => {
                    console.log(err);
                });
        
    }

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

                <p>{posterName}</p>
                <p> {message}</p>
                <li onClick={getComments} id="get-comment" className='active-btn'>afficher les commentaires</li>
               
                <div className='comment-container'>
                
                    {comments.map((comments) =>(
                        <Comments
                            key ={comments.id}
                            comment = {comments.comment}
                            firstName = {comments.firstName}
                            

                           /> 
                        ))}
                </div>

                <div>
                <form>
                    <input type="text" name="post" id='post' placeholder="Commenter" onChange={(e) => setNewComment
                        (e.target.value)} value={newComment}></input>
                    <li onClick={createComment} id="create-comment" className="active-btn">Commenter</li>
                </form>
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