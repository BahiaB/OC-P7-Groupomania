import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import avatar from "../image/avatar.png";
import Comments from './Comments';
//import InfiniteScroll from "react-infinite-scroll-component"
//import { post } from '../../../back/routes/post.route';

function Posts() {
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
       
        getAllPosts();
      //  getComments();
      //  addCommentToPost();
        setPages((pages) => pages + 1);
       
    // eslint-disable-next-line react-hooks/exhaustive-deps

    }, [posts]);

    
    //const [hasMore, setHasMore] = useState(true);
    
    const token = JSON.parse(localStorage.token)
    const [totalItems, setTotalItems] = useState(0);
    //const [messages, setMessages] = useState([]);
    //const [isLoading, setIsLoading] = useState(false);
    
    const [pages, setPages] = useState(0);
    
    //const [comment, setComment] = useState([])
    //const [totalComment, setTotalComment] = useState(0)



    const getAllPosts = async () => {
        // setIsLoading(true);
       
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
   /* const getComments = async () => {
        await axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}api/post/comments `,

            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log("res", res);
            setComment(res.data);
            console.log("comment", comment);
            setTotalComment(res.data.length);
            console.log(totalComment)

            if (res.data.error) {
                console.log("ici222", res.data.errors)

            }
        })
            .catch((err) => {
                console.log(err);
            });

    }
    const addCommentToPost = () => {
        if (comment.post_id === posts.id) {
            posts.comment = comment.comment
        }
    }
*/



    return (
        <>
            <div className="post-container">

                <div className="flex flex-col">
                    {posts.map(posts =>
                    (
                        <React.Fragment
                            key={posts.id}>

                            
                                {posts.message}
                                <br />
                                <p> {posts.datecreation}</p>
                               {/* <Comments /> */}


                              {/*}  <p id='comment'>{posts.comment}</p>
                                <br />
                    */}
                            

                              </React.Fragment>
                    )
                    )}
                    </div>

                    {/* {comment.map(comment =>
                    (
                        <React.Fragment
                            key={comment.post_id}>

                            <div className='comment'>
                                {comment.comment}
                                <br />
                                
                                
                                <br />
                            </div>

                    </React.Fragment> 
                    )
                    )}  */}


                       
            </div>
            </>
            );


}


            export default Posts;