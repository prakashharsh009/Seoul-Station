import  './share.css';
import PermMediaRoundedIcon from '@mui/icons-material/PermMediaRounded';
import LabelImportantRoundedIcon from '@mui/icons-material/LabelImportantRounded';
import ExploreRoundedIcon from '@mui/icons-material/ExploreRounded';
import EmojiEmotionsRoundedIcon from '@mui/icons-material/EmojiEmotionsRounded';
import { AuthContext } from '../../context/AuthContext';
import { useContext, useRef, useState } from 'react';
import axios from "../../context/axios";
import {useNavigate} from "react-router";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { Cancel } from '@mui/icons-material';
export default function Share() {

    const { user } = useContext(AuthContext);
    const desc = useRef();
    const [file , setFile] = useState(null);
    const navigate = useNavigate();


    const submitHandler = async(e) =>{
        e.preventDefault();
        const newPost = {
            userId:user._id,
            desc:desc.current.value
        }
        if(file){
            const data = new FormData();
            const fileName = Date.now()+file.name;
            data.append("name", fileName);
            data.append("file", file);
            
            newPost.img = fileName;
            try{
                await axios.post("/upload", data);

            }catch(err){
                console.log(err);
            }

        }
        try{
          await axios.post("/posts" ,newPost);
            navigate("/profile/" + user.username);
          
          alert("Post Uploaded !")
        }
        catch(err){
                console.log(err);
        }
    }


    return (
        <div className = "share">
            <div className = "shareWrapper">
                <div className = "shareTop">
                    <img className="shareProfileImg" src={user.profilePicture ? user.profilePicture :"https://seoul-station.herokuapp.com/images/"+"person/default-profile.png" } alt = " " />
                    <input placeholder = {"What's on your mind " + user.username +"?"} className = "shareInput" ref  = {desc} />
                </div>
                <hr className = "shareHr" />
                {file && (
                    <div className='shareImgContainer'>
                    <img className= "shareImg"  src = {URL.createObjectURL(file)} alt = "" />
                        <Cancel className='shareCancelImg' onClick = { () => setFile(null)} />
                    </div>
                )}

                <form className = "shareBottom" onSubmit = {submitHandler}>
                    <div className ="shareOptions">
                        <label htmlFor= "file" className = "shareOption">
                            <PermMediaRoundedIcon htmlColor = "#4285F4" className = "shareIcon" />
                            <span className = "shareOptionText">Photo/Video</span>
                            <input style = {{display : "none"}} type ="file" id = "file" accept= ".png , .jpg , .jpeg , .gif" onChange = { (e) => setFile(e.target.files[0])} />
                        </label>
                        <div className="shareOption">
                            <LabelImportantRoundedIcon htmlColor="#db4437" className="shareIcon" />
                            <span className="shareOptionText">Tag Someone</span>
                        </div>
                        <div className="shareOption">
                            <ExploreRoundedIcon htmlColor="#F4B400"className="shareIcon" />
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotionsRoundedIcon htmlColor="#0F9D58"className="shareIcon" />
                            <span className="shareOptionText">Feeling</span>
                        </div>
                    </div>
                    <button className = "shareButton" type = "submit" >Share</button>
                </form>
            </div>
        </div>
    )
}
