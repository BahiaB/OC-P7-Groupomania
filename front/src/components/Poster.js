import React, { useEffect, useState } from 'react';
import axios from 'axios';
import imageIcon from "../image/icons/img.svg"

function Poster({ getAllPosts }, posterName) {

    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [message, setMessage] = useState('');
    const [imagePost, setImagePost] = useState();
    const userId = JSON.parse(localStorage.userId)
    const token = JSON.parse(localStorage.token)
    const [imageProfile, setImageProfile] = useState()


    const getUser = () => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}api/auth/${userId} `,

            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setLastName(res.data.lastName);
            setFirstName(res.data.firstName);
            setImageProfile(res.data.imageProfile)
            if (res.data.error) {
                console.log(res.data.error)
            }
        })
            .catch((err) => {
                console.log(err);
            });
    };

    const createPost = (e) => {
        e.preventDefault();

        if (!message) {
            console.log("No message!")
            return
        } else {
            const form = new FormData()
            form.append('user_id', userId)
            form.append('message', message)
            form.append('postUserName', posterName)
            if (imagePost) {
                form.append('image', imagePost[0])
            }
            axios
                .post(`${process.env.REACT_APP_API_URL}api/post/ `, form, {
                    headers: {
                        authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }).then((res) => {
                    console.log("poster res", res);
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
    useEffect(() => {
        getUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section>
            <div className='poster-container'>
                <div >
                    <img src={imageProfile} id="image-profile" alt="profile"></img>
                    <form>
                        <textarea type="text" name="post" id='post' placeholder="Que souhaitez vous partager?" onChange={(e) => setMessage
                            (e.target.value)} value={message}></textarea>
                        <input type="file" name="post-picture" id='post-picture' className='input-file' onChange={(e) => setImagePost(e.target.files)} filename={imagePost}></input>
                        <label htmlFor="post-picture"><img src={imageIcon} id="image-icon" alt="icon poster" /></label>
                        <li onClick={createPost} id="create-post" className="active-btn">Poster</li>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Poster;

