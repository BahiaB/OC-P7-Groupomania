import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import avatar from "../image/avatar.png";
//import InfiniteScroll from "react-infinite-scroll-component"

function Comments() {
    const [comment, setComment] = useState([]);
    useState(()=>{
        getComments()
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[comment])
    
   
    const token = JSON.parse(localStorage.token)
    const [totalComment, setTotalComment] = useState(0);

    const getComments = async () => {

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
   
    return(
        <div>
 <>
            <div className="post-container">

                <div className="flex flex-col">
                    {comment.map(comment =>
                    (
                        <React.Fragment
                            key={comment.id}>

                            
                                {comment.message}
                                <br />
                                


                              {/*}  <p id='comment'>{posts.comment}</p>
                                <br />
                    */}
                            

                              </React.Fragment>
                    )
                    )}
                    </div>
        </div>
        
        
            </>
            </div>
       
    )
    
}

export default Comments;