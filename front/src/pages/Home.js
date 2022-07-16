import React, { useEffect, useState } from 'react';

import axios from 'axios';
import Poster from '../components/Poster';
import Posts from '../components/Posts'
import Search from '../image/icons/search.svg';

const Home = () => {


    if (localStorage.token === undefined) {
        window.location = ("/");
    };

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getAllPosts();
        getUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [user, setUser] = useState([]);
    const userId = JSON.parse(localStorage.userId);
    const token = JSON.parse(localStorage.token)
    const [search, setSearch] = useState('')

    const getAllPosts = async () => {

        await axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}api/post/ `,

            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setPosts(res.data);
            if (res.data.error) {
                console.log(res.data.error)
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
            setUser(res.data);

            if (res.data.error) {
                console.log(res.data.errors)
            }
        })
            .catch((err) => {
                console.log(err);
            });
    };

    const searchUser = async (e) => {
        if (search !== '')
            window.location = `/UserSearch/${search}`
        else

            window.location = '/UserSearch/'
    }

    return (

        <main>
            <div className='search-bar' >
                <input type="text" name="search-bar" id='search-bar' placeholder="recherche" onChange={(e) => setSearch
                    (e.target.value)} value={search}></input>
                <li onClick={searchUser} id="searchUser" className="active-btn"><img src={Search} id="search-button" alt="recherche" /></li>
            </div>
            <section>
                <div className="home-container">
                    <Poster
                        posterName={posts.firstName}
                        getAllPosts={getAllPosts} />
                </div>
                <div className='post-container'>
                    {posts.map(posts => (
                        <Posts
                            key={posts.post_id}
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

                </div>
            </section>
        </main>
    )
}

export default Home;
