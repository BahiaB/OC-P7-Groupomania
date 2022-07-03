import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Poster from '../components/Poster';
import Posts from '../components/Posts'
import Comments from '../components/Comments';
//import { getPostUser } from '../Utils/utils';




const Home = () =>{
    const [pages, setPages] = useState(0);
    const [posts, setPosts] = useState([]);
    const [postUser, setPostUser]= useState("");
    useEffect(() =>{
        getAllPosts();
        getUser();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const [user, setUser] = useState([]);
    const userId = JSON.parse(localStorage.userId); // Utiliser getItem
    const token = JSON.parse(localStorage.token)
   // const [pages, setPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
   


   
    
    const getAllPosts = async () => {
       
     // alert("alert!!!")
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
           //getPostUser(posts.post_user_id)
          console.log(posts.post_id)
          console.log(posts)

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
                <Poster getAllPosts = {getAllPosts}/>
                </div>
                <div className='post-container'>
                {posts.map(posts => (
                    <Posts 
                    key ={posts.id}
                    posterName ={posts.firstName}
                    message ={posts.message}
                    date = {posts.dateCreation}
                    postId = {posts.post_id}
                   postUserId = {posts.post_user_id}
                   getAllPosts= {getAllPosts}
                   like={posts.total_like}

                    />

                
                ))}
                <Comments />
                    
                </div>
            </section>
        </main>
    )
}

export default Home;
