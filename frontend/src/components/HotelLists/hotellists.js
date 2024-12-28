import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import "./hotellists.css";
import HotelImage from "../../images/Hotel.jpg";
import Apartment from "../../images/Apartment.jpg";
import Resort from "../../images/Resort.jpg";
import Villa from "../../images/Villa.jpg";

function HotelLists() {
    const navigate = useNavigate();
    const [featuredHotels, setFeaturedHotels] = useState([]);

    useEffect(() => {
        featuredHotel();
    },[])

    const Hyderabad =
        "https://www.goindigo.in/content/dam/skyplus6e/in/en/assets/Destinations/hyderabad/073616_T_Prince_charminar-1.jpg";
    const Mumbai =
        "https://cdn.britannica.com/26/84526-050-45452C37/Gateway-monument-India-entrance-Mumbai-Harbour-coast.jpg";
    const Bengaluru =
        "https://i.kinja-img.com/image/upload/c_fill,h_900,q_60,w_1600/1432fedb88c0d1cc56f4c496a80f251c.jpg";

    //fetching featured Hotels Lists
    const featuredHotel = async() => {
        try{
            const response = await axios.get("https://hotel-booking-2-htu6.onrender.com/hotels/featuredHotels/featured/limit?featured=true&limit=4");
            setFeaturedHotels(response.data);
        }
        catch(err){
            console.log("Error fetching the Featured Hotels", err);
        }
    };

    return (
        <>
            <div className="container TypesOfHotelSections py-4">
                {/* City Section */}
                <div className="row g-4 justify-content-center">
                <h4 className="text-center mb-4 cityHeader">
                    <strong style={{color:'rgba(0,0,0,0.7)'}}>BEST METROPOLITAN STAYS</strong>
                </h4>
                    <div className="col-lg-4 col-md-6 col-sm-12 d-flex flex-column align-items-center">
                        <img
                            className="img-fluid rounded city-image"
                            src={Hyderabad}
                            alt="Hyderabad"
                            onClick={() => navigate("/hotelDetails/Hyderabad")}
                        />
                        <h5 className="text-center mt-2">Hyderabad</h5>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 d-flex flex-column align-items-center">
                        <img
                            className="img-fluid rounded city-image"
                            src={Mumbai}
                            alt="Mumbai"
                            onClick={() => navigate("/hotelDetails/Mumbai")}
                        />
                        <h5 className="text-center mt-2">Mumbai</h5>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 d-flex flex-column align-items-center">
                        <img
                            className="img-fluid rounded city-image"
                            src={Bengaluru}
                            alt="Bengaluru"
                            onClick={() => navigate("/hotelDetails/Bengaluru")}
                        />
                        <h5 className="text-center mt-2">Bengaluru</h5>
                    </div>
                </div>
            </div>
            <div className="container py-4">
                <h3 className="text-center mb-4">
                    <strong style={{color:'rgba(0,0,0,0.7)'}}>Choose your best way to Stay</strong>
                </h3>
                <div
                    id="carouselExampleIndicators"
                    className="carousel slide"
                    data-bs-ride="carousel"
                >
                    <div className="carousel-indicators">
                        <button
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to="0"
                            className="active"
                            aria-label="Slide 1"
                        ></button>
                        <button
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to="1"
                            aria-label="Slide 2"
                        ></button>
                        <button
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to="2"
                            aria-label="Slide 3"
                        ></button>
                        <button
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to="3"
                            aria-label="Slide 4"
                        ></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img
                                src={HotelImage}
                                className="d-block w-100"
                                alt="Hotels Stay"
                                onClick={() => navigate("/hotelDetails/Hotel")}
                            />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Hotels</h5>
                                <p>Best Hotels in India</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img
                                src={Apartment}
                                className="d-block w-100"
                                alt="Apartments Stay"
                                onClick={() => navigate("/hotelDetails/Apartment")}
                            />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Apartments</h5>
                                <p>Get 50% off on Bookings</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img
                                src={Resort}
                                className="d-block w-100"
                                alt="Resorts Stay"
                                onClick={() => navigate("/hotelDetails/Resort")}
                            />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Resorts</h5>
                                <p>Get up to 30% off</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img
                                src={Villa}
                                className="d-block w-100"
                                alt="Villas Stay"
                                onClick={() => navigate("/hotelDetails/Villa")}
                            />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Villas</h5>
                                <p>Get up to 20% off</p>
                            </div>
                        </div>
                    </div>
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className="container fHotels">
                <h3 style={{textAlign:'center'}}><strong style={{color:'rgba(0,0,0,0.7)'}}>Fetured Hotels for YOU</strong></h3>
                <div className="featured-hotels">
                <div className="cardSection">
                    {featuredHotels.map((item,index) => (
                        <div className="card">
                            <img 
                                src={item.images[0]}
                                className="card-img-top"
                            />
                            <div className="card-body">
                                <h5>{item.name}</h5>
                                <p>{item.type}</p>
                                <p style={{fontWeight:'600'}}>Some of the best features Provided by this site</p>
                                <p>{item.city}</p>
                                <button className="btn btn-primary">Featured</button>
                            </div>
                        </div>
                    ))}
                </div>
                </div>
            </div>
        </>
    );
}

export default HotelLists;
