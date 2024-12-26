import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css"
import "./signup.css"
import { useAuthenticate } from "../../context/Authentication.js";
import axios from "axios";

function Signup(){
    const navigate = useNavigate();
    const {login} = useAuthenticate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const HandlerSignup = async(e) => {
        e.preventDefault();

        try{
            const response = await axios.post("http://localhost:8000/users/sign_up",
                {
                    email, username, password
                },
                {
                    withCredentials:true
                }
            );

            if(response.data.message === "signed up successfully"){
                alert("signed up successfully, returning to Home page")
                const {username, _id} = response.data.otherdetails;
                login(username, _id);
                navigate("/");
            }else{
                alert(response.data.message);
            }
        }
        catch(err){
            alert("Something went wrong", err);
        }
    }
    return(
        <>
            <div className="signup-container">
                <div className="signup-form-container">
                    <h1>Signup</h1>
                    <form onSubmit={HandlerSignup} className="form-control">
                        <div className="signup-input-box">
                            <input className="form-control" type="email"  required placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <i className="bi bi-envelope-fill"></i>
                        </div>
                        <div className="signup-input-box">
                            <input className="form-control" type="text"  required placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            <i className="bi bi-person-fill"></i>
                        </div>
                        <div className="signup-input-box">
                            <input className="form-control" type="password"  required placeholder="create password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <i className="bi bi-lock-fill"></i>
                        </div>
                        <div className="signup-remember-me">
                            <label>
                                <input type="checkbox" /> remember me
                            </label>
                        </div>
                        <div className="signup-button-signup">
                            <input className="btn btn-primary" type="submit" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Signup;