import React, { useState } from 'react';
import axios from 'axios';
import Comments from './Comments';
import UpdatePost from './UpdatePost';
import heart from "../image/icons/heart.svg";
import { useNavigate } from 'react-router-dom';

const Posts = ({ message, date, posterName, postId, postUserId, like, getAllPosts, imageProfile, admin, imagePost }) => {

    const token = JSON.parse(localStorage.token)
    const userId = JSON.parse(localStorage.userId)
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [postModal, setPostModal] = useState(false)
    const navigate = useNavigate();

    const handlePost = (e) => {
        setPostModal(true)
    }


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
            setNewComment(res.data.message)
            getComments();
            if (res.data.error) {
                console.log(res.data.error)
            }
        })
            .catch((err) => {
                console.log(err);
            });
    }

    const deletePost = () => {
        if (window.confirm("atention cette action est ireversible"))
		{
        axios({
            method: "DELETE",
            url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,

            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setPosts(res.data);
            window.location.reload(false);
            if (res.data.error) {
                console.log(res.data.error)

            }
        })
            .catch((err) => {
                console.log(err);
            });
        }
    }


    const getComments = () => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
        }).then((res) => {
            setComments(res.data);
            if (res.data.error) {
                console.log(res.data.error)

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
            .then((res) => {
                getAllPosts()
            }
            )
    }

    const getPoster = () => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}api/auth/${postUserId} `,

            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res);
            navigate(`/account/${postUserId}`)
            if (res.data.error) {
                console.log(res.data.error)
            }
        })
            .catch((err) => {
                console.log(err);
            });

    };



    return (


        <div className="post-container">
            <div>
                <img src={imageProfile} id="image-post" alt="profile"></img>
                <li onClick={getPoster} id="get-user-account" className='active-btn'>{posterName}: à partagé:</li>
            </div>
            <div className='post'>
               {imagePost ? (
                <img src= {imagePost} id="image-post2" alt="imagepost"/>
               ) : ('')
               }
                <p className='text'> {message}</p>

            </div>
            <div className='post-option' >
                <li onClick={addLike} id="add-like">
                    <img src={heart} id="heart" alt="heart" />
                    <p> {like}</p>
                </li>
                
                <li onClick={getComments} id="get-comment" className='active-btn'>afficher les commentaires</li>
            </div>
            
            <div >

                {comments.map((comments) => (
                    <Comments
                        key={comments.id}
                        commentId={comments.id}
                        commentUserId={comments.user_id}
                        comment={comments.comment}
                        firstName={comments.firstName}
                        admin={admin}
                        getComments={getComments}
                    />
                ))}
            </div>
            <div>
                <form className=''>
                    <textarea type="text" name="comment" id='comment-input' placeholder="Commenter" onChange={(e) => setNewComment
                        (e.target.value)} value={newComment}></textarea>
                    <li onClick={createComment} id="create-comment" className="active-btn">Commenter</li>
                </form>
            </div>
            <div className='modify-delete-line'>
            {postUserId === userId || admin === 1 ? (
                        <li onClick={handlePost} id="update-post" className="active-btn">Modifier ce post</li>)
                        : ("")}
                    {postModal && <UpdatePost postId={postId} getAllPosts={getAllPosts} />}

            {postUserId === userId || admin === 1 ? (
                <li onClick={deletePost} id="delete_post" className='active-btn'>Supprimer ce post</li>
            )
                : ("")
            }
            </div>
            <br />

        </div>



    )
}



export default Posts;