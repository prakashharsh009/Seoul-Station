import React, { useContext, useEffect } from "react";
import  "./post.css";
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import axios from "../../context/axios";
import{format} from "timeago.js";
import {Link} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";



export default function Post({post}) {

    const [like , setLike] = React.useState(post.likes.length);
    const [isliked, setisLiked] = React.useState(false);
    const [user, setUser] = React.useState({});


    
    const {user:currentUser} = useContext(AuthContext);

    const likeHandler  = () =>{

        try{    
            axios.put("/posts/"+post._id+"/like", {userId:currentUser._id});

        }catch(err){

        }
        setLike(isliked ? like-1:like+1);
        setisLiked(!isliked);

    }

    useEffect(() =>{
        setisLiked(post.likes.includes(currentUser._id));
    }, [currentUser._id, post.likes])
    

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?userId=${post.userId}`);
            
            setUser(res.data);
        };
        if (!user) {
            return null;
        }

        fetchUser();
    }, [post.userId]);


    
    return (
        <div className="post">
            <div className="postWrapper">
                <div className = "postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`} style={{ textDecoration: "none" }}>
                            <img className="postProfileImg" src={user.profilePicture || "https://seoul-backend.herokuapp.com/images/"+"person/default-profile.png"} alt="" />
                           
                        </Link>
                        <span className="postUserName">{user.username}</span>
                        
                        <span className="postDate">•  {format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVertRoundedIcon />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img className="postImg" src={"https://seoul-backend.herokuapp.com/images/"+post.img} alt = "" />
                </div>
                <div className="postBottom">
                    <div className = "postBottomLeft">
                        <img className="likeIcon" src={`${"https://seoul-backend.herokuapp.com/images/"}like.png`}  onClick={likeHandler} alt="" />
                        <img className="likeIcon" src={`${"https://seoul-backend.herokuapp.com/images/"}heart.png`}  onClick={likeHandler} alt = "" />
                        <span className="postLikeCounter">{like} people like this</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} comments</span>
                    </div>
                </div>


            </div>
        </div>
    )
}
