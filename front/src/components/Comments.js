import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import avatar from "../image/avatar.png";
//import InfiniteScroll from "react-infinite-scroll-component"

function Comments({ key, comment, firstName }) {
    //alert("!!!")
    const token = JSON.parse(localStorage.token);
    const userId = JSON.parse(localStorage.userId);
    const [newComment, setNewComment] = useState("");

 
    return (
        <div>
            <p>{firstName}</p>
            <p> {comment}</p>
        
        </div>
    )

}

export default Comments;