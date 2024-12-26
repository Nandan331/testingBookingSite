import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css"
import Navbar from "../components/Navbar/Navbar.js";
import Search from "../components/Search/search.js";
import HotelLists from "../components/HotelLists/hotellists.js";
import Footer from "../components/Footer/footer.js";
import Footer2 from "../components/Footer/footer2.js";

function Home(){
    return (
        <>
        <div style={{backgroundColor:'#004D80', height:'300px'}}>
            <Navbar/>
            <Search/>
            <HotelLists/>
            <div className="container-fluid"style={{backgroundColor:'rgba(0,0,0,0.1)', padding:'2%'}}>
            <Footer/>
           </div>
           <div className="container-fluid" style={{backgroundColor:'rgba(0,0,0,0.9)', color:'white'}}>
            <Footer2/>
           </div>
        </div>
        </>
    )
};
export default Home;