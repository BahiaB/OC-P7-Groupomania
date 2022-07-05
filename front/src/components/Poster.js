import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';
//import avatar from "../image/avatar.png"
//import { getPostUser } from '../Utils/utils';
//import { getAllPosts } from "../pages/Home";

function Poster({getAllPosts}, posterName){
    //console.log("info",info)
    
    const [lastName, setLastName]= useState('');
    const [firstName, setFirstName] = useState('');
    const [message, setMessage] = useState('');
    const [posts, setPosts] = useState('');
    const[userpost,setUserPost] = useState('')
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
        axios ({
            method: "POST",
            url: `${process.env.REACT_APP_API_URL}api/post/`,
            data: {
                userId : userId,
                message: message,
                postUserName: posterName
           
            },
            headers:{
                authorization:`Bearer ${token}`
            }
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
                <li onClick={createPost} id="create-post" className="active-btn">Poster</li>
                </form>
                
            </div>
        </div>
        </section>
    )
}

export default Poster;