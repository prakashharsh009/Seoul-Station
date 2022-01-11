import  "./closeFriend.css";

export default function CloseFriend({user}) {

    return (
        <li className="sidebarFriend">
            <img className="sidebarFriendImg" src={"https://seoul-backend.herokuapp.com/images/"+user.profilePicture} alt="" />
            <span className="sidebarFriendName">{user.username}</span>
        </li>
    )
}



