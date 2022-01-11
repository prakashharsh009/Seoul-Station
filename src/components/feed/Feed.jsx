import { useContext, useEffect, useState } from 'react';
import Post from '../post/Post';
import Share from '../share/Share';
import  './feed.css';
import Profile from '../../pages/profile/Profile';
import axios from "../../context/axios";

import {AuthContext} from "../../context/AuthContext";
export default function Feed({ username }) {
    const [posts , setPosts] = useState([]);
    const {user} = useContext(AuthContext);

    useEffect( () =>{
        const fetchPosts = async () =>{
            const res = username ? await axios.get("/posts/profile/" + username) 
                : await axios.get("/posts/timeline/" + user._id);
                console.log(res);
                console.log(user._id);
           const feedPosts = res.data.sort((p1, p2) => {
                   return new Date(p2.createdAt) - new Date(p1.createdAt);
               });
           
           

            setPosts(feedPosts);

        };


            

        fetchPosts();
    }, [username, user]);

   {/* return arguments.sort(function (a, b)
   return [].slice.call(p1, p2).sort(function (a, b) { */}

    
    return (
        <div className = "feed">

            
            <div className = "feedWrapper" >
                
                {(!username || username === user.username) &&<Share />}
                {posts.map( (p)=> {
                   return  <Post key= {p._id} post = {p} />

                })} 

            </div>
            
        </div>
    );
}
