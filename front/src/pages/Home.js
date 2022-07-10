import React, { useEffect, useState } from 'react';

import axios from 'axios';
import Poster from '../components/Poster';
import Posts from '../components/Posts'
import Comments from '../components/Comments';
import Search from'../image/icons/search.svg';

import UserSearch from'../pages/UserSearch';
import { NavLink } from 'react-router-dom';


const Home = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getAllPosts();
        getUser();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [user, setUser] = useState([]);
    const userId = JSON.parse(localStorage.userId);
    const token = JSON.parse(localStorage.token)
    const [totalItems, setTotalItems] = useState(0);
    const [search, setSearch] = useState('')
    const[userSearch, setUserSearch]= useState([]);
    //const userSearch = [];

    const getAllPosts = async () => {

        await axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}api/post/ `,

            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log("res", res.data);
            setTotalItems(res.data.length);
            setPosts(res.data);
            console.log("posts", posts)
            if (res.data.error) {
            }
        })
            .catch((err) => {
                console.log(err);
            });

    };


    const getUser = () => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}api/auth/${userId} `,

            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res);
            setUser(res.data);

            if (res.data.error) {
                console.log("ici", res.data.errors)
            }
        })
            .catch((err) => {
                console.log(err);
            });
    };

    const searchUser = async (e) => {
        window.location = `/UserSearch/${search}`
    }
  
    return (
        <main>
           
           <div className='search-bar' >
                <input type="text" name="search-bar" id='search-bar' placeholder="recherche" onChange={(e) => setSearch
                        (e.target.value)} value={search}></input>
                <li onClick={searchUser} id="searchUser" className="active-btn"><img src={Search}id="search-button" alt="recherche"/></li>
            </div>
               
            <section>
                <div className="home-container">
                    <Poster
                        posterName={posts.firstName}
                        getAllPosts={getAllPosts} />
                </div>
                <div className='post-container'>
                    {posts.map( posts => (
                        <Posts
                            key={posts.id}
                            posterName={posts.firstName}
                            message={posts.message}
                            date={posts.dateCreation}
                            postId={posts.post_id}
                            postUserId={posts.post_user_id}
                            getAllPosts={getAllPosts}
                            like={posts.total_like}
                            imageProfile={posts.post_imageurl}
                            imagePost={posts.imageurl}
                            admin={user.admin}
                        />
))}
                    <Comments />

                </div>
            </section>
        </main>
    )
}

export default Home;
