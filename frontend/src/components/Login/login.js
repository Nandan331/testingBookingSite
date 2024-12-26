import React from "react";
import {useState} from "react";
import { useAuthenticate } from "../../context/Authentication.js";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css"
import "./login.css"
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login(){
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, verifyAuth } = useAuthenticate();

    const handlerLogin = async(e) => {
        e.preventDefault();

        try{
            const response = await axios.post("http://localhost:8000/users/login",
                {
                    username, password
                },
                {
                    withCredentials:true
                }
            )
            if(response.data.message === "user logged in successfully"){
                alert("loggedin Suceessfully, returning to the Home Page");
                login(response.data.details.username, response.data.details._id);
                console.log("Verifying Admin: ",response.data.Admin);
                navigate("/");
            }else{
                alert(response.data.message);
            }
        }
        catch(err){
            alert("Error occured", err);
        }
    };

    return(
        <>
        <div className="LoginContainer">
        <div className="loginForm">
        <h1>Login</h1>
            <form onSubmit={handlerLogin} className="form-control">
                <div className="login-input-box">
                    <input className="form-control" type="text" required placeholder="username" name="email" value={username} onChange={(e)=>setUsername(e.target.value)}/><i className="bi bi-person-fill"></i>
                </div>
                <div className="login-input-box">
                    <input className="form-control" type="password" required placeholder="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}/><i className="bi bi-lock-fill"></i>
                </div>
                <div className="login-button">
                    <input className="btn btn-primary" type="submit"/>
                </div>
                <h6>Don't have an account</h6>
                <div className="login-button">
                    <button className="btn btn-success">
                        <Link className="login-signup" to='/signup'>Signup</Link>
                    </button>
                </div>
            </form>
        </div>
    </div>
    </>
    
    )
};
export default Login;