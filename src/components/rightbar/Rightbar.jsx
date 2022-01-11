import  "./rightbar.css";
import {Users} from "../../dummyData";
import Online from "../online/Online";
import { useEffect, useState , useContext} from "react";
import axios from "../../context/axios";
import { AuthContext } from "../../context/AuthContext";
import {Link} from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function Rightbar({user}) {
    const [friends, setFriends] = useState([]);

    const {user:currentUser, dispatch}  = useContext(AuthContext);
    const [followed, setFollowed] = useState([]);

    useEffect(()=>{
    
        setFollowed(currentUser?.followings?.includes(user?.id));
        
    },[currentUser])
    
    


    useEffect( () =>{

        const getFriends = async () =>{
            try{
                const friendList = await axios.get("/users/friends/"+  currentUser._id);
                setFriends(friendList.data);
                

            }catch(err){
                console.log(err);
            }
        }
        getFriends();
    },[user]);


    const handleClick = async () =>{
        try{
            if(followed){
            await axios.put("/users/" + user._id + "/unfollow", {userId:currentUser._id});
            dispatch({type:"UNFOLLOW", payload:user._id});
            }
            else{
                await axios.put("/users/" + user._id + "/follow", { userId: currentUser._id });
                dispatch({ type: "UNFOLLOW" , payload: user._id}); 
            }

        }catch(err){
            console.log(err);
        }
        setFollowed(!followed);
    }

    const HomeRightbar = () =>{
        return (<>
        
            <div className="birthdayContainer">
                <img className="birthdayImg" src="/assets/gift.png" alt="" />
                <span className="birthdayText"><b>Harry Styles</b> and <b>4 other friends</b> have their birthday today!</span>

            </div>
            <img className="rightbarAd" src="/assets/ad.png" alt = "" />
            <h4 className="rightbarTitle">Online Friends</h4>
            <ul className="rightbarFriendList">
                {Users.map(u => (
                    <Online key={u.id} user={u} />
                ))}
            </ul>
        
        </>
        );
    }

    const ProfileRightbar = () =>{
        return (

            <>
                {user.username !== currentUser.username && (
                    <button className="rightbarFollowButton" onClick = {handleClick}>
                        {followed ? "Unfollow" : "Follow" }
                        {followed ? <RemoveIcon /> : <AddIcon />}
                    </button>
                )}
                <h4 className="rightbarTitle">About the Passenger</h4>
                <div className  = "rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <span className="rightbarInfoValue">{user.city}</span>
                        </div>

                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From:</span>
                        <span className="rightbarInfoValue">{user.from}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship:</span>
                        <span className="rightbarInfoValue">{user.relationship === 1? "Single" : 2? "Married" :"Complicated"}</span>
                    </div>
                </div>
                <h4 className="rightbarTitle">{currentUser.username +"'s Friends"}</h4>
                <div className="rightbarFolllowings">


                        
                        
                        {friends.map((friend, index) => (
                            <Link key = {index} to={"/profile/" + friend.username} style = {{textDecoration:"none"}}>
                            <div className="rightbarFollowing">
                                <img className="rightbarFollowingImg" src={friend.profilePicture ? friend.profilePicture : "/assets/person/default-profile.png"} alt="" />
                                <span className="rightbarFollowingName">{friend.username}</span>
                            </div>

                        
                        </Link>
                        ))}
                       
                        
                   
                </div>

            </>


        );
    }
    return (
        <div className = "rightbar">
            <div className="rightbarWrapper">
                { user ?<ProfileRightbar /> :<HomeRightbar />}
            </div>
        </div>
    )
}
