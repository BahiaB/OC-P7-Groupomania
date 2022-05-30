import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import avatar from "../image/avatar.png";
import InfiniteScroll from "react-infinite-scroll-component"

function Posts() {

    useEffect(() => {
        getAllPosts();
        setPages((pages) => pages + 1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const token = JSON.parse(localStorage.token)
    const [totalItems, setTotalItems] = useState(0);
    const [messages, setMessages] = useState([]);
    //const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [pages, setPages] = useState(0);
    const [posts, setPosts] = useState([]);



    const filterPosts = (posts, query) => {
        if (!query) {
            return posts;
        }

        return posts.filter((post, id) => {
            const postName = post.lastName.toLowerCase();
            const postPrenom = post.firstName.toLowerCase();
            const postMessage = post.message.toLowerCase();

            return (
                postName.includes(query) ||
                postPrenom.includes(query) ||
                postMessage.includes(query)
            );

        });
    };

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
            //setMessages([...messages, ...res.messages]);



            if (res.data.error) {
                console.log("ici222", res.data.errors)

            }
        })
            .catch((err) => {
                console.log(err);
            });

    };



    return (
        <>
            <div className="post-container">

                <div className="flex flex-col">
                    {posts.map(posts =>
                    (
                        <React.Fragment
                            key={posts.id}>

                            <div className='message'>
                                {posts.message}
                                <br />
                                <p> {posts.datecreation}</p>
                            </div>

                        </React.Fragment>
                    )
                    )}


                </div>
            </div>
        </>
    );


}


export default Posts;