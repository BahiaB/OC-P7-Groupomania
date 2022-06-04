import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import avatar from "../image/avatar.png";
import Comments from './Comments';
//import InfiniteScroll from "react-infinite-scroll-component"
//import { post } from '../../../back/routes/post.route';
import Poster from './Poster';

const Posts = ({key, message, date, firstName})=>{
    
    
   // const [posts, setPosts] = useState([]);
   /* const [pages, setPages] = useState(0);
    useEffect(() => {
       
        getAllPosts();
      //  getComments();
      //  addCommentToPost();
        setPages((pages) => pages + 1);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    
    }, []);
    console.log("poster mess", Poster.message)
   
   
   
    
    //const [hasMore, setHasMore] = useState(true);
    

    const token = JSON.parse(localStorage.token)
    const [totalItems, setTotalItems] = useState(0);
    //const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    
    
    //const [comment, setComment] = useState([])
    //const [totalComment, setTotalComment] = useState(0)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getAllPosts = async () => {
        setIsLoading(true);
      
       await axios({
           method: "GET",
           url: `${process.env.REACT_APP_API_URL}api/post/ `,

           headers: {
               authorization: `Bearer ${token}`
           }
       }).then((res) => {
           console.log("res", res);
           setPosts(res.data);
           console.log("post", posts);
           setTotalItems(res.data.length);
           console.log(totalItems)
           if (res.data.error) {
               console.log("ici222", res.data.errors)

           }
       })
           .catch((err) => {
               console.log(err);
           });

   };
   */


    return (
        
            <div className="post-container">
                
                <p>{firstName}</p>
                <p> {message}</p>
                <br />
                       
            </div>
            
            );

}


            export default Posts;