import { init } from 'ityped';
import { useContext, useEffect , useRef } from "react";
import "./loginStyle.css";
import {loginCall} from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';


export default function Login() {

    const email = useRef();
    const password = useRef();
    const { user, isFetching, error, dispatch } = useContext(AuthContext);

    const handleClick = (e) => {
        e.preventDefault();
        loginCall({ email: email.current.value, password: password.current.value }, dispatch);
    };

    console.log(user);

    const textRef = useRef();

    useEffect(() => {
        
        init(textRef.current, {
            showCursor: false, 
            backDelay:1500,
            typeSpeed:50,
            backSpeed:90,
            showCursor:true,
            

            strings: ['Bienvenido', '환영하다', 'स्वागत', 'いらっしゃいませ', 'Добро пожаловать','Welcome to','Seoul Station'] })
        
    }, []);

   
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
                    <input  type = "email" placeholder="email" required  className="loginInput" ref = {email} />
                    <input type = "password" placeholder="password" required  min-length = "6" className="loginInput" ref = {password} />
                        <button className="loginButton" disabled = {isFetching}>{isFetching ? <CircularProgress color = "inherit"/> :"Log In"}</button>
                    <span className = "loginForgot">Forgot password?</span>
                        <Link to ="/register"><button className="loginRegisterButton">{isFetching ? <CircularProgress color="inherit" /> : "Create a new Account!"}</button></Link>

                    </form>
                </div>

            </div>
            
        </div>
    )
}
