import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import "./showHotels.css"

function ShowHotels(){
    const [getHotels, setGetHotels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    //fetching the Hotels
    const fetchHotels = async() => {
        try{
            setLoading(true);
            const response = await axios.get('http://localhost:8000/hotels/getAllHotels',{withCredentials:true})
            setGetHotels(response.data);
        }
        catch(err){
            setError(err.message);
        }
        finally{
            setLoading(false);
        }
    };

    //deleting the Hotels based on Hotel_id
    const handleDelete = async(hotelid) => {
        try{
             await axios.delete(`http://localhost:8000/hotels/hoteldelete/${hotelid}`,{withCredentials:true})
             alert("Hotel deleted successfully");
             setGetHotels(getHotels.filter((hotel) => hotel._id !== hotelid));
        }
        catch(err){
            console.log("Unable to delete the Hotel", err);
            alert("Error deleting Hotel")
        }
    };
    useEffect(() => {
        fetchHotels();
    },[])
    if(loading) return <>loading, please wait....</>
    if(error) return <>Error, {error}</>
    return(
        <>
        <div className="container">
            <div className="hSection">
            <table className="hContent">
                <tr>
                    <th>S.no</th>
                    <th>Hotel_id</th>
                    <th>Hotel_Name</th>
                    <th>type</th>
                    <th>Hotel_city</th>
                    <th>Hotel_Address</th>
                    <th colSpan='3'>operations</th>
                </tr>
                {getHotels?.map((item, index) => (
                    <>
                    <tr key={index}>
                        <td>{index}</td>
                        <td>{item._id}</td>
                        <td>{item.name}</td>
                        <td>{item.type}</td>
                        <td>{item.city}</td>
                        <td>{item.address}</td>
                        <td>
                            <button 
                                className="btn btn-success"
                                onClick={() => {
                                    navigate(`/admin/hotel/edit/${item._id}`)
                                }}
                            >
                                edit
                            </button>
                        </td>
                        <td>
                            <button 
                                onClick={() => handleDelete(item._id)}
                                className="btn btn-danger"
                                >
                                Delete
                            </button>
                        </td>
                    </tr>
                    </>
                ))}              
            </table>
            </div>
        </div>
        </>
    )
};
export default  ShowHotels;
    