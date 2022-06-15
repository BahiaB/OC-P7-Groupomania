import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Poster from '../components/Poster';
import Posts from '../components/Posts'
import Comments from '../components/Comments';
//import { post } from '../../../back/routes/post.route';

//import { post } from '../../../back/routes/post.route';




const Home = () =>{
    const [pages, setPages] = useState(0);
    const [posts, setPosts] = useState([]);
    
    useEffect(() =>{
        getAllPosts();
        getUser();
        setPages((pages) => pages +1);
    
    
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const [user, setUser] = useState([]);
    const userId = JSON.parse(localStorage.userId); // Utiliser getItem
    const token = JSON.parse(localStorage.token)
   // const [pages, setPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    //const [messages, setMessages] = useState([]);
   // const [isLoading, setIsLoading] = useState(false);

    
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
           console.log(posts.post_id)
        console.log("postid", posts.post_id)

           
           console.log(totalItems)
           if (res.data.error) {
               console.log("ici222", res.data.errors)

           }
       })
           .catch((err) => {
               console.log(err);
           });

   };

   const getUser = () =>{
    axios ({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}api/auth/${userId} `,
        
        headers:{
            authorization:`Bearer ${token}`
        }
    }).then((res) => {
        console.log(res);
        setUser(res.data);
        
        if (res.data.error) {
            console.log("ici",res.data.errors)
           
        } 
      })
      .catch((err) => {
        console.log(err);
      });

  };

  
    
    
    return(
        <main>
            <section>
                <div className="home-container">
                <h3>Bienvenue sur Groupomania</h3>
                <Poster info={user}/>
                </div>
                <div className='post-container'>
                {posts.map(posts => (
                    <Posts 
                    key ={posts.id}
                    firstName ={user.firstName}
                    message ={posts.message}
                    date = {posts.dateCreation}
                    postId = {posts.post_id}
                    postUserId = {posts.post_user_id}

                    />

                
                ))}
                    
                </div>
            </section>
        </main>
    )
}

export default Home;
