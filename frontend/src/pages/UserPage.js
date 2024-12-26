import React from "react";
import UserAccount from "../components/UserAccount/useraccount.js";
import Navbar from "../components/Navbar/Navbar.js";


 function UserPage() {
    return(
        <>
        <div style={{backgroundColor:'#004D80'}}>
        <Navbar/>
        </div>
        <UserAccount/>
        </>
    )
 };
 export default UserPage;
