import React, { useEffect, useState } from 'react';
import { NavLink, renderMatches } from "react-router-dom";
import axios from 'axios';
//import avatar from "../image/avatar.png";
import Comments from './Comments';
import Home from '../pages/Home'
//import { getPostUser } from '../Utils/utils';
import Poster from './Poster';
import heart from "../image/icons/heart.svg";

const Posts = ({ key, message, date, posterName, postId, postUserId, like ,getAllPosts, imageProfile, admin }) => {

    
   // console.log(postUserId)
    const token = JSON.parse(localStorage.token)
    const userId = JSON.parse(localStorage.userId)

    const [posts, setPosts] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [activUser, SetActivUser] = useState(false);
    const [comments, setComments] = useState([]);
    const[user, setUser]= useState([])
    const admin2 = admin
   
    //const token = JSON.parse(localStorage.token);
   // const userId = JSON.parse(localStorage.userId);
   //console.log("adminnn", admin)
    const [newComment, setNewComment] = useState("");
    const [postUser, setPostUser] = useState([]);
   // const [comment, setComment] = useState([])
   //const [like, setLike] = useState(false)
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

    const addLike = () => {

        axios({
            method: "POST",
            url: `${process.env.REACT_APP_API_URL}api/post/like `,
            data: {
                user_id: userId,
                post_id: postId,
            },
            headers: {
                authorization: `Bearer ${token}`
            },
        })
            .then((res) =>{
               
                getAllPosts()
            
    }
    )
        console.log("ici4")

        console.log("ici5")
    }

    const getUser2 = () =>{
        console.log("admin2", admin2)
        axios ({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}api/auth/${postUserId} `,
            
            headers:{
                authorization:`Bearer ${token}`
            }
        }).then((res) => {
            console.log(res);
            console.log("adin", admin)
            //setUser(res.data);
            window.location= `/account/${postUserId}`
            
            if (res.data.error) {
                console.log("ici",res.data.errors)
               
            } 
          })
          .catch((err) => {
            console.log(err);
          });
    
      };
    
    

    return (
        
        
            <div className="post-container">
                
                <img src={imageProfile}   id="image-post" alt="profile"></img>
                <div className='post'>
                <li onClick={getUser2} id="get-user-account" className='active-btn'>{posterName}:</li>
                
                <p  className='text'> {message}</p>
               
                </div>
                <div className='post-option' >
                <li onClick={addLike} id="add-like">
                    <img src={heart} id="heart" alt="heart" />
                    <p> {like}</p>
                </li>
                
                <li onClick={getComments} id="get-comment" className='active-btn'>afficher les commentaires</li>
                </div>
                <div >
                
                    {comments.map((comments) =>(
                        <Comments
                            key ={comments.id}
                            commentId= {comments.id}
                            commentUserId = {comments.user_id}
                            comment = {comments.comment}
                            firstName = {comments.firstName}
                            admin = {admin}
                            getComments={getComments}
                            

                           /> 
                        ))}
                </div>

                <div>
                <form className=''>
                    <textarea type="text" name="post" id='comment-input' placeholder="Commenter" onChange={(e) => setNewComment
                        (e.target.value)} value={newComment}></textarea>
                    <li onClick={createComment} id="create-comment" className="active-btn">Commenter</li>
                </form>
                    </div>
               
               
                {postUserId === userId  || admin2 === 1 ? (
                    <li onClick={deletePost} id="delete_post" className='active-btn'>Supprimer ce post</li>
                )
                    : ("")
                }
                <br />
            </div>
     


    )
            }



export default Posts;