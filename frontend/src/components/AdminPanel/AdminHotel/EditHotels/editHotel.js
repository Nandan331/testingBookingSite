import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./editHotel.css"

function EditHotel(){
    const {hotelid} = useParams();
    const [hotelDetails, setHotelDetails] = useState(
        {
            name:"",
            type:"",
            city:"",
            address:"",
            rating:0,
            cheapestPrices:0
        }
    );
    const [originalData, setOriginalData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchHotelDetails = async() => {
        try{
            setLoading(true)
            const response = await axios.get(`http://localhost:8000/hotels/getHotel/${hotelid}`,{withCredentials:true})
            setHotelDetails(response.data);
            setOriginalData(response.data);
        }
        catch(err){
            setError(err.message);
        }
        finally{
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchHotelDetails();
    },[hotelid])

    const handleChange = (e) => {
        const {name, value} = e.target;
        setHotelDetails({...hotelDetails, [name] : value});
    }

    const handleSave = async() => {
        try{
            if(
                originalData.name === hotelDetails.name &&
                originalData.type === hotelDetails.type &&
                originalData.city === hotelDetails.city &&
                originalData.address === hotelDetails.address &&
                originalData.rating === hotelDetails.rating &&
                originalData.cheapestPrices === hotelDetails.cheapestPrices
            ){
                alert("No changes were made");
                return
            }
            await axios.put(`http://localhost:8000/hotels/hotelupdate/${hotelid}`,
                hotelDetails,
                {withCredentials:true}
            );
            alert("Hotel Details updated Successfully")
            fetchHotelDetails();
        }
        catch(err){
            alert("Error updating Hotel",err)
            console.log("Error updating Hotel", err.message);
        }
    };

    if(loading) return<>Loading, please wait....</>
    if(error) return<>Error,{error}</>
    
    return (
        <>
        <div className="container fhSection">
            <div className="hotelDetails">
                <form className="form-control fhContainer">
                <h5><strong style={{color:'black'}}>Updating Hotel</strong></h5>
                    <h4 style={{fontWeight:600}}>Hotel: {hotelDetails.name}</h4>
                    <div className="form-control inputBox">
                        <label>Hotel Name:</label>
                        <input 
                            type="text" 
                            placeholder="enter Hotel Name"
                            className="form-control"
                            name="name"
                            value={hotelDetails.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-control inputBox">
                        <label>Hotel type:</label>
                        <input 
                            type="text" 
                            placeholder="enter type"
                            className="form-control"
                            name="type"
                            value={hotelDetails.type}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-control inputBox">
                        <label>City:</label>
                        <input 
                            type="text" 
                            placeholder="enter city"
                            className="form-control"
                            name="city"
                            value={hotelDetails.city}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-control inputBox">
                        <label>address:</label>
                        <input 
                            type="text" 
                            placeholder="enter address"
                            className="form-control"
                            name="address"
                            value={hotelDetails.address}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-control inputBox">
                        <label>rating:</label>
                        <input 
                            type="number" 
                            placeholder="enter ratings"
                            className="form-control"
                            name="rating"
                            value={hotelDetails.rating}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-control inputBox">
                        <label>Price:</label>
                        <input 
                            type="number" 
                            placeholder="enter Price"
                            className="form-control"
                            name="cheapestPrices"
                            value={hotelDetails.cheapestPrices}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                         type="button"
                         onClick={handleSave}
                    >
                        upadte
                    </button>
                </form>
            </div>
        </div> 
        </>
    )
};
export default EditHotel;