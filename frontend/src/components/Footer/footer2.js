import React from "react"
import "../../../node_modules/bootstrap/dist/css/bootstrap.css"
import InstagramIcon from "@mui/icons-material/Instagram"
import FacebookIcon from "@mui/icons-material/Facebook"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import XIcon from "@mui/icons-material/X"

function Footer2(){
    return (
        <>
        <div className="container socialMediaSections" style={{padding:'5%', display:'flex', justifyContent:'space-around'}}>
            <div className="SocialIcons">
            <h3>Follows on</h3>
            <InstagramIcon fontSize="large"/>
            <XIcon fontSize="large"/>
            <FacebookIcon fontSize="large"/>
            <LinkedInIcon fontSize="large"/>
            </div>
            <div>
                <h6>@2024 HotelBooking PVT.LTD</h6>
                <p>country India</p>
            </div>
        </div>
        </>
    )
};
export default Footer2;