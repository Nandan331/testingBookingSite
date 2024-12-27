import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.css"
import Navbar from "../components/Navbar/Navbar.js"
import Search from "../components/Search/search.js";
import FetchHotels from "../components/fetchhotels/fetchhotels.js";
import PriceCreteria from "../components/PriceCriteria/pricecriteria.js";
import Footer from "../components/Footer/footer.js";
import Footer2 from "../components/Footer/footer2.js";

function HotelsPage(){
    const { cities } = useParams();
    const [ min, setMin ] = useState(null);
    const [ max, setMax ] = useState(null);
    return(
        <>
        <div style={{backgroundColor:'#004D80'}}>
        <Navbar/>
        <Search/>
        </div>
        <div className="container">
            <div className="row">
                <div className="price-creteria col-lg-3 col-md-6 col-sm-12">
                    <PriceCreteria min = {min} max = {max} setMin = {setMin} setMax = {setMax}/>
                </div>
                <div className="fetch-hotels col-lg-9 col-md-6 col-sm-12">
                    <FetchHotels cities = {cities} minPrice = {min} maxPrice = {max}/>
                </div>
            </div>
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
export default HotelsPage;