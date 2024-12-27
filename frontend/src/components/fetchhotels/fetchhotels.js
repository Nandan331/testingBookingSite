import React from "react";
import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css"
import { useAuthenticate } from "../../context/Authentication.js";
import "./fetchHotels.css"
import { useCheckDates } from "../../context/CheckDates.js";

function FetchHotels({ cities, minPrice, maxPrice }){
    const { isAuthenticated } = useAuthenticate();
    const [getHotels, setGetHotels] = useState([]);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const {InDate , OutDate} = useCheckDates();

    useEffect(() => {
        if(minPrice !== null && maxPrice !== null){
            PriceCreteria(minPrice, maxPrice);
        }
        else{
            fetchHotels(cities);
        }
    }, [cities, minPrice, maxPrice]);


    //Fetching the Hotel's based on the City or Hotel Name
    const fetchHotels = async(cities) => {
        try{
            setLoading(true);
            const response = await axios.get(`http://localhost:8000/hotels/search?query=${cities}`)
            setGetHotels(response.data);
        }
        catch(err){
            console.log("Something went wrong", err)
        }
        finally{
            setLoading(false);
        }
    };

    //Fetching the Hotel based on the price creteria
    const PriceCreteria = async(minPrice, maxPrice) => {
        try{
            const response = await axios.get(`http://localhost:8000/hotels/min/max/city?min=${minPrice}&max=${maxPrice}&city=${cities}`,{withCredentials:true})
            setGetHotels(response.data);
        }
        catch(err){
            console.log("Error occured in the Price creteria", err);
        }
    };

    //Carrying to the Rooms list page 
    const carryToRoomsPage = (hotelId) => {
        if(!InDate || !OutDate)
            return alert("please select check-in and check-out dates")
        try{
            if(isAuthenticated){
                navigate(`/roomLists/${hotelId}`)
            }else{
                navigate('/login')
            }
        }
        catch(err){

        }
    };

    if(loading) return <p style={{textAlign:'center'}}>loading please wait...</p>

    return (
        <>
        <div className="container fetchHotelContainer">
            <div className="fetchingHotels">
            {getHotels.length > 0 ? (    
                getHotels.map((item, index) => (
                 <div className="htsSection" onClick={() => carryToRoomsPage(item._id)}>
                    <div className="HotelImgSection">
                        <img 
                            src={item.images[0]}
                            alt={item.name}
                            loading="lazy"
                        />
                    </div>
                    <div className="HotelDetailSection">
                        <h4><strong style={{color:'black'}}>{item.name}</strong></h4>
                        <p>{item.type}</p>
                        <p>{item.city}</p>
                        <p style={{backgroundColor:'green', color:'white', display:'inline', padding:'2%', borderRadius:'5px'}}>Free airport taxi</p>
                        <p style={{marginTop:'2%'}}><i className="fas fa-map-marker-alt"></i> {item.address}</p>
                        <p><strong style={{color:'green'}}>Free cancellation from your proifle</strong></p>
                        <p style={{color:'green'}}>you can cancel later, so lock in this great price</p>
                    </div>
                    <div className="HotelPriceSection">
                        <button
                             className="btn"
                             style={{backgroundColor:'#0071c2'}}
                             onClick={() => carryToRoomsPage(item._id)}
                        >
                        <strong>see availability</strong>
                        </button>
                        <div>
                            <p>ratings: {item.rating} <i className="fas fa-star"></i></p>
                            <h5>Rs. {item.cheapestPrices}</h5>
                        </div>
                    </div>
                </div>
            ))):(
                <>
                <p style={{textAlign:'center'}}>No hotels are there based on search Criteria</p>
                </>
            )}
            </div>
        </div>    
        </>
    )
};
export default FetchHotels;