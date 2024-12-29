import { useState, useEffect } from "react";
import "../../../../../node_modules/bootstrap/dist/css/bootstrap.css"
import axios from "axios";
import "./createHotels.css"
import { apiurl } from "../../../../config/config";

function CreateHotel(){
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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)

    const handleSelect = (e) => {
        const {name, value} = e.target;
        setHotelDetails({...hotelDetails,[name] : value});
    }

    const createHotel = async() => {
        try{
            setLoading(true)
            await axios.post(`${apiurl}/hotels/hotelcreate`,
                hotelDetails,{withCredentials:true}
            );
            alert("Hotel created successfully");
        }
        catch(err){
            setError(err.message);
        }
        finally{
            setLoading(false);
        }
    };
    if(loading)return <>loading, please wait....</>
    if(error)return<>Error..{error}</>
    return (
        <>
        <div className="createContainer">
            <div className="hotelFormSection">
                <form className="form-control hotelForm">
                <h5 style={{textAlign:'center', marginTop:'50px'}}><strong style={{color:'black'}}>Hotel create</strong></h5>
                    <div className="form-control">
                        <label>hotel name:</label>
                        <input
                           type="text"
                           className="form-control"
                           placeholder="hotel name"
                           name="name"
                           value={hotelDetails.name}
                           onChange={handleSelect}
                           required
                        />
                    </div>
                    <div className="form-control">
                        <label>select hotel type:</label>
                        <select
                             className="form-control"
                             name="type"
                             value={hotelDetails.type}
                             onChange={handleSelect}
                             required
                        >
                            <option value="" disabled>
                                select type
                            </option>
                            <option value="Hotel">Hotel</option>
                            <option value="Apartment">Apartment</option>
                            <option value="Villas">Villas</option>
                            <option value="Resorts">Resorts</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <label>city:</label>
                        <input
                           type="text"
                           className="form-control"
                           placeholder="city"
                           name="city"
                           value={hotelDetails.city}
                           onChange={handleSelect}
                           required
                        />
                    </div>
                    <div className="form-control">
                        <label>address:</label> 
                        <input
                           type="text"
                           className="form-control"
                           placeholder="address"
                           name="address"
                           value={hotelDetails.address}
                           onChange={handleSelect}
                           required
                        />
                    </div>
                    <div className="form-control">
                        <label>ratings:</label>
                        <input
                           type="number"
                           className="form-control"
                           placeholder="rating"
                           name="rating"
                           value={hotelDetails.rating}
                           onChange={handleSelect}
                           required
                        />
                    </div>
                    <div className="form-control">
                        <label>Price:</label>
                        <input
                           type="number"
                           className="form-control"
                           placeholder="Price"
                           name="cheapestPrices"
                           value={hotelDetails.cheapestPrices}
                           onChange={handleSelect}
                           required
                        />
                    </div>
                    <button
                        type="button"
                        onClick={createHotel}
                    >
                        create
                    </button>
                </form>
            </div>
        </div>
        </>
    )
};
export default CreateHotel;