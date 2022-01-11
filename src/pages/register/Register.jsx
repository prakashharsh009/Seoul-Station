import { Button, dividerClasses } from "@mui/material"
import "./register.css";
import { init } from 'ityped';
import { useEffect , useRef } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";

export default function Register() {

    const textRef = useRef()

    useEffect(() => {
        
        init(textRef.current, {
            showCursor: false, 
            backDelay:1500,
            typeSpeed:50,
            backSpeed:90,
            showCursor:true,
            

            strings: ['Bienvenido', '환영하다', 'स्वागत', 'いらっしゃいませ', 'Добро пожаловать','Welcome to','Seoul Station'] })
        
    }, []);

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const history = useNavigate();


    const handleClick = async (e) =>{
        e.preventDefault();
        if(passwordAgain.current.value !== password.current.value){
            passwordAgain.current.setCustomValidity("Passwords don't match ! Try Again.")
        }else{
            const user = {
                username:username.current.value,
                email: email.current.value,
                password: password.current.value,


            };
            try{
                 await axios.post("/auth/register", user);
                 history("/login");

            }
            catch(err){
                console.log(err);
            }
            
        }
    }



    return (
        
        <div className="login">

            <div className="loginWrapper">
                <h3 className="loginLogo" ref={textRef}></h3>
                <div className="loginLeft">
                    
                </div>
                    <div className="loginDesc">
                        Connect with friends and world around you !

                    </div>
                
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input placeholder="email" type = "email" required ref={email}className="loginInput" />
                        <input placeholder="Username"  required ref = {username}className="loginInput" />

                        <input placeholder="password" type="password" min-length = "6" required ref={password} className="loginInput" />

                        <input placeholder="Re-enter password" type="password" min-length="6" required ref={passwordAgain} className="loginInput" />
                    <button className="loginButton" type = "submit">Sign Up!</button>
                
                        <Link to = "/login" ><button className="loginRegisterButton">Log into your Account</button></Link>
                    

                    </form>
                </div>

            </div>
            
        </div>
    )
}
