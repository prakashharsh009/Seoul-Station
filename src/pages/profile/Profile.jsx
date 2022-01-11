import "./profile.css";
import Topbar from "../../components/topbar/Topbar.jsx";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import Rightbar from "../../components/rightbar/Rightbar.jsx";
import Feed from "../../components/feed/Feed.jsx";
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import { useEffect, useState } from "react";
import axios from "../../context/axios";
import {useParams} from "react-router";

export default function Profile() {
    
    const [user, setUser] = useState({});
    const username = useParams().username;

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?username=${username}`);

            setUser(res.data);
        };

        fetchUser();
    }, [username]);

    return (
        <div>
            <>
                <Topbar />
                <div className="profile" >
                    <Sidebar />
                    <div className="profileRight">

                        <div className = "profileRightTop">
                            <div className="profileCover">
                                <img className="profileCoverImg" src={user.coverPicture || "https://seoul-station.herokuapp.com/images/person/default-cover.jpg"} alt="" />
                                <img className="profileUserImg" src={user.profilePicture || "https://seoul-station.herokuapp.com/images/person/default-profile.png"} alt="" />

                            </div>
                            <div className="profileInfo">

                                {user.username === "Harsh Prakash" ? <h4 className="profileInfoName">{user.username} < VerifiedRoundedIcon htmlColor="#9400d3" /></h4> : <h4 className="profileInfoName">{user.username}</h4>}
                                

                                
                                
                                
                                <span className="profileInfoDesc">{user.desc}</span>

                            </div>
                        </div>
                        <div className="profileRightBottom">
                            <Feed username = {username} />
                            <Rightbar  user = {user}/>
                        </div>

                    </div>
                    
                </div>

            </>

        </div>
    )
}
