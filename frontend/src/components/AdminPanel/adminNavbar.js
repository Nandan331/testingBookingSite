import React from "react"
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css"
import { useAuthenticate } from "../../context/Authentication";

function AdminNavbar(){
    const {username, login, logout} = useAuthenticate();
    const [admin, setAdmin] = useState('');
    const handleSelect = () => {

    }
    return (
        <>
        <div className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/"><h4><strong style={{color:'black'}}>Hotels Booking site</strong></h4></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar nav ms-auto">
                        <li className="nav-item">
                            <strong style={{color:'black'}}>Admin, {username}</strong>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        </>
    )
};
export default AdminNavbar;