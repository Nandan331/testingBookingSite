import React from "react"
import { Link, useNavigate } from "react-router-dom";
import { useAuthenticate } from "../../context/Authentication.js"
import "../../../node_modules/bootstrap/dist/css/bootstrap.css"
import "./Navbar.css"

function Navbar () {
    const {logout, username, admin, isAuthenticated} = useAuthenticate();
    const navigate = useNavigate();

    const Logout = () => {
        logout();
        navigate('/');
    };

    
    return (
        <>
        <div className="navbar navbar-expand-lg navbar-custom">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand"><h4><strong>Hotels Booking site</strong></h4></Link>
                <button className="navbar-toggler" type="button" data-bs-target="#navbaritemsContent" data-bs-toggle="collapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbaritemsContent">
                    <ul className="navbar nav ms-auto">
                        {isAuthenticated ? (
                            <>
                            <li className="nav-item"><strong>welcome, {username}</strong></li>
                            <li className="nav-item dropdown" style={{marginRight:'25px'}}>
                                <a 
                                     className="nav-link dropdown-toggle" 
                                     href="#" role="button" 
                                     data-bs-toggle="dropdown"
                                     style={{color:'white'}}
                                     ><strong>your Profile</strong>
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link className="dropdown-item" to='/useraccount'>Your Bookings</Link>
                                    </li>
                                    <li>
                                        <button
                                             className="btn"
                                             onClick={Logout}
                                             style={{color:'black'}}
                                        >logout
                                        </button>
                                    </li>
                                </ul>
                            </li>
                            </>
                        ):(
                            <>
                            <li className="nav-item">
                                <Link className="nav-link" to='/login'><b>Login</b></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/signup'><b>SignUp</b></Link>
                            </li>
                            </>
                        )}
                        {admin? (
                            <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin"><b>Admin</b></Link>
                            </li>
                            </>
                        ):(
                            <></>
                        )}
                    </ul>
                </div>
            </div>
        </div>
        </>
    )
};
export default Navbar;