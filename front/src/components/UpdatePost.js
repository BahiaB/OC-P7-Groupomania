import React, { useEffect, useState } from 'react';
import axios from "axios";

function UpdatePost({ postmodal, postId, getAllPosts }) {

    const [message, setMessage] = useState("");
    const [imagePost, setImagePost] = useState([]);
    const token = JSON.parse(localStorage.token)
    const [lastPost, setLastPost] = useState('')

    useEffect(() => {

        getLastPost();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getLastPost = async () => {

        await axios.get(`${process.env.REACT_APP_API_URL}api/post/modifypost/${postId} `,
            {
                headers: {
                    authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                setLastPost(res.data[0].message)
                setMessage(res.data[0].message)

            })
    }

    const handlePost = (e) => {
        e.preventDefault()
        const form = new FormData()
        form.append('message', message)
        form.append('image', imagePost[0])

        axios
            .put(`${process.env.REACT_APP_API_URL}api/post/modifypost/${postId} `, form, {
                headers: {
                    authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                getAllPosts()
                window.location="/home"

                if (res.data.error)
                    console.log("Aucune modification n'à été apporté")
                
            })
    }

    return (
        <div classename="post-form">
            <form onSubmit={handlePost} id="post-form">
                <textarea type="text" defaultValue={lastPost} name='message' id='message' onChange={(e) => setMessage
                    (e.target.value)} ></textarea>
                <label htmlFor='message'></label>
                <div className='password error'></div>
                <br />
                <input type="file" name="post-picture" id='post-picture' onChange={(e) => setImagePost(e.target.files)} filename={imagePost}></input>
                <br />
                <input type="submit" classename="active-btn" id="change-post" value="modifier"></input>
            </form>
        </div>
    )
}

export default UpdatePost;