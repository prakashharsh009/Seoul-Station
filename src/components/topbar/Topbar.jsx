import "./Topbar.css";
import {Search, Person, Chat , Notifications, AutoFixOffSharp} from "@mui/icons-material";
import EmojiPeopleRoundedIcon from '@mui/icons-material/EmojiPeopleRounded';
import {Link} from "react-router-dom";
import Feed from "../feed/Feed";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "../../context/axios";

export default function Topbar(){
    const {user} = useContext(AuthContext);
   

    const logout = async () =>{
        
        
        localStorage.removeItem("user");
        window.location.replace("/login");
        
    }


    return (

        <div className = "topbarContainer">
            <div className="topbarLeft">
                <Link to = "/" style = {{textDecoration:"none"}}>
                    <span className="logo">Seoul Station</span>
                    </Link>
                
            </div>
            <img className="ss-logo" src="/assets/sidebarIcons/ss-logo.gif" /> 
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search className=" searchIcon" />
                    <input placeholder= "Your Seoul-Mate is just a Search Away !"className="searchInput"/>
                </div>
            </div>
            <div className="topbarRight">
            <Link style = {{textDecoration:"none"}}to= "/"><span className="topbarLink">Feed</span></Link>

                <Link to = "" onClick={logout} ><span className="topbarLink">Logout</span></Link>

                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications />
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>
                <Link to = {`/profile/${user.username}`}>
                    <img src={user.profilePicture ? user.profilePicture : "https://seoul-station.herokuapp.com/images/" + "person/default-profile.png"} alt="" className="topbarImg" />
                </Link>
               

            </div>
            
        </div>
    )


}   

