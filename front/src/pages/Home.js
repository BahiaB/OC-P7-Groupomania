import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Poster from '../components/Poster';
import Posts from '../components/Posts'
import Comments from '../components/Comments';
//import { post } from '../../../back/routes/post.route';




const Home = () =>{

    const [posts, setPosts] = useState([]);
    
    useEffect(() =>{
        getAllPosts();
        getUser();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const [user, setUser] = useState([]);
    const userId = JSON.parse(localStorage.userId);
    const token = JSON.parse(localStorage.token)
    const [pages, setPages] = useState(0);
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
                <div home-container>
                Hello depuis la page Home
                <Poster info={user}/>
                </div>
                <div className='post-container'>
                {posts.map(posts => (
                    <Posts 
                    key ={posts.id}
                    firstName ={user.firstName}
                    message ={posts.message}
                    date = {posts.dateCreation}

                    />

                
                ))}
                    
                </div>
            </section>
        </main>
    )
}

export default Home;
