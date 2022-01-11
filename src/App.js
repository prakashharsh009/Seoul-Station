import React, { useContext } from "react";
import Profile from "./pages/profile/Profile.jsx";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import {
    BrowserRouter as Router,
    Route,
    Navigate
    
} from "react-router-dom";

import {  Routes, Switch} from "react-router";
import { AuthContext } from "./context/AuthContext.js";



function App(){
    const {user} = useContext(AuthContext);

    return (
        <Router>
            <Routes>
                
                <Route exact path="/" element={user ? <Home /> : <Register />} />
                
                <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
                
                <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
                <Route path="/profile/:username" element={<Profile />} />

                
               
            </Routes>
            
        </Router>
    );
}

export default App;
