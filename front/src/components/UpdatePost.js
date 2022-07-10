import React, { useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';



function UpdatePost({postId, getAllPosts}) {

    const [message, setMessage] = useState("");
    const [imagePost, setImagePost] = useState([]);
    const [postModal, setPostModal] = useState(false)

    const token = JSON.parse(localStorage.token)

    const handlePost = (e) => {
        e.preventDefault()
        const form = new FormData()
        form.append('message', message)
        form.append('image', imagePost[0])
        console.log(postId)
       
        axios
            .put(`${process.env.REACT_APP_API_URL}api/post/modifypost/${postId} `, form, {
                headers: {
                    authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                getAllPosts()
                window.location = 'http://localhost:3000/home'
                console.log(res)
            })
    }
    

    return (
        <form onSubmit={handlePost} id="post-form">
            <label htmlFor='message'>message</label>
            <br />
            <input type="text" name='message' id='message' onChange={(e) => setMessage
                (e.target.value)} value={message}></input>
            <div className='password error'></div>
            <br />
            <input type="file" name="post-picture" id='post-picture' onChange={(e) => setImagePost(e.target.files)} filename={imagePost}></input>
            <br />
            <input type="submit" classename="active-btn" id="change-post" value="modifier mon post"></input>
        </form>
    )
}

export default UpdatePost;