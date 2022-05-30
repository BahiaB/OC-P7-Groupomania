import React, { useEffect } from 'react';
import axios from 'axios';
import Poster from '../components/Poster';
import Posts from '../components/Posts'




const Home = () =>{
    console.log(localStorage);
   /* const NewData = [];
    const token = JSON.parse(localStorage.token)
    
    const getAllPosts = () =>{
        axios ({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}api/post/ `,
            
            headers:{
                authorization:`Bearer ${token}`
            }
        }).then((res) => {
            console.log(res);
			NewData = res.data;
               
           
          })
          .catch((err) => {
            console.log(err);
          });

      };

      useEffect(getAllPosts);*/
    
    
    return(
        <main>
            <section>
                <div home-container>
                Hello depuis la page Home
                <Poster />
                </div>
                <div className='post-container'>
                    <Posts />
                </div>
            </section>
        </main>
    )
}

export default Home;
