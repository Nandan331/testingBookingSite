import React, {useState, useEffect} from "react"
import "../../../node_modules/bootstrap/dist/css/bootstrap.css"
import "./pricecriteria.css"

function PriceCreteria({ min, max, setMin, setMax}){
    const SubmitHandler = (e) => {
        e.preventDefault();
    }
    return(
        <>
        <div className="container">
            <div className="form-sections">
                <p><strong style={{color:'black'}}>Search</strong></p>
            <form onSubmit={SubmitHandler}>
                <div className="minPrice">
                   <label className="form-label">Min
                    <input 
                    type="number" 
                    placeholder="min price" 
                    value={min}
                    onChange={(e) => setMin(e.target.value)}
                    className="form-control"
                    />
                    </label>
                </div>
                <div className="maxPrice">
                    <label className="form-label">Max
                    <input 
                    type="number" 
                    placeholder="max price" 
                    value={max}
                    onChange={(e) => setMax(e.target.value)}
                    className="form-control"
                    />
                    </label>
                </div>
            </form>
            </div>
            <div className="properties-popularity-section">
                <div className="container facilities-section">
                    <h5><strong style={{color:'black', padding:'2%'}}>facilities/highlights</strong></h5>
                    <div className="facilities">
                        <i className="fas fa-check" style={{marginBottom:'7%'}}></i><span style={{margin:'4%'}}>Free wifi </span> <i className="fas fa-wifi"></i>
                        <br/>
                        <i className="fas fa-check" style={{marginBottom:'7%'}}></i><span style={{margin:'4%'}}>Kitchen</span> <i className="fas fa-utensils"></i>
                        <br/>
                        <i className="fas fa-check" style={{marginBottom:'7%'}}></i><span style={{margin:'4%'}}>Hygiene</span> <i className="fas fa-hand-sparkles"></i>
                        <br/>
                        <i className="fas fa-check" style={{marginBottom:'7%'}}></i><span style={{margin:'4%'}}>Parking</span> <i className="fas fa-parking"></i>
                    </div>
                </div>
                <hr/>
                <div className="container popular-cities">
                    <h5><strong style={{color:'black'}}>Popular Cities</strong></h5>
                    <ul>
                        <li>
                            
                                <strong style={{color:'black'}}>Mumbai</strong>
                                <p>Some hotel</p>
                        </li> 
                        <li>   
                            
                                <strong style={{color:'black'}}>Hyderabad</strong>
                                <p>Hotel Daspalla</p>
                            
                        </li>
                        <li>
                            
                                <strong style={{color:'black'}}>Goa</strong>
                                <p>Some Hotel</p>
                            
                        </li>
                        <li>
                            
                                <strong style={{color:'black'}}>Chennai</strong>
                                <p>Some Hotel</p>
                            
                        </li> 
                    </ul>
                </div>
                <hr/>
                <div className="container properties">
                    <h5><strong style={{color:'black'}}>Property Type</strong></h5>
                    <ul>
                        <li>
                            <strong style={{color:'black'}}>Villas</strong>
                        </li>
                        <li>
                            <strong style={{color:'black'}}>Hotels</strong>
                        </li>
                        <li>
                            <strong style={{color:'black'}}>Apartment</strong>
                        </li>
                        <li>
                            <strong style={{color:'black'}}>Resorts</strong>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        
       
        </>
    )
};
export default PriceCreteria;