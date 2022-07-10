import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import imageIcon from"../image/icons/img.svg"
//import { getPostUser } from '../Utils/utils';
//import { getAllPosts } from "../pages/Home";

function Poster({getAllPosts}, posterName){
    //console.log("info",info)
    
    const [lastName, setLastName]= useState('');
    const [firstName, setFirstName] = useState('');
    const [message, setMessage] = useState('');
   // const [posts, setPosts] = useState('');
   // const[userpost,setUserPost] = useState('')
   const [imagePost, setImagePost]= useState();
    const userId = JSON.parse(localStorage.userId)
	const token = JSON.parse(localStorage.token)
    const [imageProfile, setImageProfile]= useState()


    const getUser =  () =>{
		 axios ({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}api/auth/${userId} `,
            
            headers:{
                authorization:`Bearer ${token}`
            }
        }).then((res) => {
            console.log("poster",res.data);
			setLastName(res.data.lastName);
			setFirstName(res.data.firstName);
            setImageProfile(res.data.imageProfile)
            console.log(firstName)
            if (res.data.error) {
                console.log("ici222",res.data.errors)
               
            } 
          })
          .catch((err) => {
            console.log(err);
          });
      };

    
     

      const createPost = (e) =>{
        e.preventDefault();
        
        //getUserPost();
        if(!message ){
            console.log("No message!")
            return
        }else{

            const form = new FormData()
            form.append('user_id', userId)
            form.append('message', message)
            
            form.append('image', imagePost[0])
            form.append('postUserName', posterName)
            console.log("dewfdw", userId)
            console.log(form.get('user_id'))
            console.log("image", imagePost)
            axios
                .post(`${process.env.REACT_APP_API_URL}api/post/ `, form, {
                    headers: {
                        authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }).then((res) => {
            console.log("poster res",res);
			setMessage(res.data.message)
            getAllPosts();
            if (res.data.error) {
                console.log("ici222",res.data.errors)
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
    
    return(
        <section>
        <div className='poster-container'>

            <div >
                <img src={imageProfile}   id="image-profile" alt="profile"></img>
               
                <form>
                <textarea type="text" name="post" id='post' placeholder="Que souhaitez vous partager?" onChange={(e) => setMessage
                (e.target.value)} value={message}></textarea>
                <input type="file" name="post-picture" id='post-picture' className='input-file' onChange={(e) => setImagePost(e.target.files)} filename={imagePost}></input>
                <label htmlFor="post-picture"><img src={imageIcon} id="image-icon" alt="icon poster"/></label>
                <li onClick={createPost} id="create-post" className="active-btn">Poster</li>
                </form>
                
            </div>
        </div>
        </section>
    )
}

export default Poster;

