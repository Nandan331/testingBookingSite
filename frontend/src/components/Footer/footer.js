import React from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css"
import "./footer.css"


function Footer(){

    return(
        <>
        <div className="container FootSections">
            <div className="row footerSections">
            <div className="col-lg-3 col-md-6 col-sm-12 HelpSection">
                <li>Help Center</li>
                <li>FAQs</li>
                <li>Privacy Policy</li>
                <li>Cookie Policy</li>
                <li>Terms of use</li>
                <li>Manage cookie settings</li>
                <li>Digital Services(UI)</li>
                <li>Content guidelines and Reporting</li>
                <li>Modern salvery statement</li>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 CompanySection">
                <li>About us</li>
                <li>Careers</li>
                <li>Press</li>
                <li>Blog</li>
                <li>PointMAX</li>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 Destinations">
                <li>Countries/Territories</li>
                <li>All Flight Routes</li>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12PartnerSections">
                <li>YCS partner portal</li>
                <li>Partner Hub</li>
                <li>Advertise on HotelBooking</li>
                <li>Affiliates</li>
                <li>HotelBooking API Documentation</li>
            </div>
            </div>
        </div>
        </>
    )
};
export default Footer;