import "./sidebar.css";


import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";




export default function Sidebar(){
    return (
        <div className = "sidebar">
            <div className="sidebarWrapper">

                <ul className = "sidebarList">
                    <li className = "sidebarListItem">
                        <img src="/assets/sidebarIcons/feed.png" className="sidebarIcon" alt="" />
                        <span className="sidebarListItemText">Feed</span>
                    </li>
                    <li className="sidebarListItem">
                        <img src="/assets/sidebarIcons/chats.png" className="sidebarIcon" alt="" />
                        <span className="sidebarListItemText">Chats</span>
                    </li>
                    <li className="sidebarListItem">
                        <img src="/assets/sidebarIcons/videos.png" className="sidebarIcon" alt="" />
                        <span className="sidebarListItemText">Videos</span>
                    </li>
                    <li className="sidebarListItem">
                        <img src="/assets/sidebarIcons/groups.png" className="sidebarIcon" alt="" />
                        <span className="sidebarListItemText">Groups</span>
                    </li>
                    <li className="sidebarListItem">
                        <img src = "/assets/sidebarIcons/bookmark.png" className="sidebarIcon" alt = ""/>
                        <span className="sidebarListItemText">Bookmarks</span>
                    </li>
                    <li className="sidebarListItem">
                        <img src="/assets/sidebarIcons/help.png" className="sidebarIcon" alt="" />
                        <span className="sidebarListItemText">Reach Us</span>
                    </li>
                    <li className="sidebarListItem">
                        <img src="/assets/sidebarIcons/jobs.png" className="sidebarIcon" alt="" />
                        <span className="sidebarListItemText">Jobs</span>
                    </li>
                    <li className="sidebarListItem">
                        <img src="/assets/sidebarIcons/events.png" className="sidebarIcon" alt="" />
                        <span className="sidebarListItemText">Events</span>
                    </li>
                    <li className="sidebarListItem">
                        <img src="/assets/sidebarIcons/learning.png" className="sidebarIcon" alt="" />
                        <span className="sidebarListItemText">Learning</span>
                    </li>
                </ul>
                <button className="sidebarButton">Show More!</button>
                <hr className="sidebarHr"></hr>
                <ul className="sidebarFriendList">

                    {Users.map(u =>(
                        <CloseFriend key = {u.id} user = {u} />
                    ))}

                </ul>
            </div>
        </div>
    )
}