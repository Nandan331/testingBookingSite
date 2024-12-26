import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();
function AuthProvider( {children} ){
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const getAuth = JSON.parse(localStorage.getItem("isAuthenticated"));
        const getUserId = localStorage.getItem("userId");
        const getUsername = localStorage.getItem("username")

        if(getAuth && getUserId && getUsername){
            setIsAuthenticated(getAuth);
            setUserId(getUserId);
            setUsername(getUsername);
        }
    },[]);


    const login = (name , user_id) => {
        setIsAuthenticated(true);
        setUserId(user_id);
        setUsername(name);

        localStorage.setItem("isAuthenticated",true);
        localStorage.setItem("username",name);
        localStorage.setItem("userId",user_id);
    }

    
    const logout = () => {
        setIsAuthenticated(false);
        setUserId(null);
        setUsername(null);

        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("username");
        localStorage.removeItem("userId");
    }

    return(
        <>
        <AuthContext.Provider value={ {login, logout, username, userId, isAuthenticated} }>
            {children}
        </AuthContext.Provider>
        </>
    )
}
export default AuthProvider;
export const useAuthenticate = () => useContext(AuthContext);
