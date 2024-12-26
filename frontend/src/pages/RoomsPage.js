import React from "react";
import {  useParams } from "react-router-dom";
import RoomLists from "../components/Reserve/reserve.js";
import Navbar from "../components/Navbar/Navbar.js";
import Search from "../components/Search/search.js";
import Footer from "../components/Footer/footer.js";
import Footer2 from "../components/Footer/footer2.js";

function RoomsPage (){
    const { hotelid } = useParams();
    
    

    return(
        <>
        <div style={{backgroundColor:'#004D80'}}>
        <Navbar/>
        <Search/>
        </div>
        <div>
        <RoomLists hotelid = {hotelid}/>
        </div>
        <div className="container-fluid" style={{backgroundColor:'rgba(0,0,0,0.1)', padding:'2%'}}>
            <Footer/>
        </div>
        <div className="container-fluid" style={{backgroundColor:'rgba(0,0,0,0.9)', color:'white'}}>
            <Footer2/>
        </div>
        
        
        </>
    )
};
export default RoomsPage;