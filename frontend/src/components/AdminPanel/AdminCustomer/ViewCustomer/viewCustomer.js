import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../../../../../node_modules/bootstrap/dist/css/bootstrap.css";
import "./viewCustomer.css"
import AdminNavbar from "../../adminNavbar";
import { apiurl } from "../../../../config/config.js";
function ViewCustomer(){
    const [getUser, setGetUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {userId} = useParams();
    const navigate = useNavigate();

    const fetchUserDetails = async() => {
        try{
            setLoading(true)
            const response  = await axios.get(`${apiurl}/users/getUser/${userId}`,{withCredentials:true})
            setGetUser(response.data);
        }catch(err){
            setError(err.message);
        }
        finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchUserDetails();
    },[userId]);

    if(loading) return<>Loading, please wait....</>
    if(error) return <>Error, {error}</>
    return (
        <>
        <AdminNavbar/>
        <div className="container">
          <p><strong style={{color:'rgba(0,0,0,0.3'}}>Customer Info</strong></p>
            <div className="userDetailsSection">
                <div className="imgSection">
                    <div>
                        <img src=""/>
                    </div>
                </div>
                <div className="uDetails">
                    {getUser ? (
                        <>
                        <h3><strong style={{color:'black'}}>{getUser.username}</strong></h3>
                        <p><span>Email :</span>{getUser.email}</p>
                        <p><span>Admin :</span>{getUser.Admin}/No</p>
                        <button
                            onClick={() => navigate(`/admin/customer/edit/${getUser._id}`)}
                        >
                            edit
                        </button>
                        </>
                    ):<><p>No User found</p></>}
                </div>
            </div>
            <div className="rcDetails row">
                <h3 style={{fontWeight:'600'}}>Customer Activities</h3>
                <div className="rDetails col-lg-4 col-md-6 col-sm-12">
                    <p style={{fontWeight:600, textAlign:'center'}}>user Reservations</p>
                    {getUser.reservations?.length > 0 ? (
                        getUser.reservations.map((item, index) => (
                            <div key={item._id} className="card reservation-card mb-3">
                                <div className="card-body">
                                        <h5 className="card-title"><strong style={{color:'black'}}>{item.hotel_Name}</strong></h5>
                                        <p className="card-text">Room Numbers: {item.roomNumbers?.map(rn => rn.number).join(", ")}</p>
                                        <p className="card-text">Check-In: {new Date(item.checkInDate).toLocaleString()}</p>
                                        <p className="card-text">Check-Out: {new Date(item.checkOutDate).toLocaleString()}</p>
                                        <p className="card-text">Guests: {item.adults} Adults, {item.children} Children</p>
                                        <p className="card-text">Total Price: Rs. {item.totalPrice}</p>
                                        <p className="card-text">Payment Id {item.payment_id}</p>
                                        <p><strong style={{color:'green'}}>Free cancellation from your profile</strong></p>
                                </div>
                            </div>
                        ))
                    ):<><p style={{textAlign:'center'}}>No Active Reservations</p></>}
                </div>
                <div className="cDetails col-lg-4 col-md-6 col-sm-12">
                <p style={{fontWeight:600, textAlign:'center'}}>User CancelledReservations</p>
                    {getUser.canceledReservations?.length > 0 ? (
                        getUser.canceledReservations.map((item, index) => (
                            <div key={item._id} className="card reservation-card mb-3">
                                <div className="card-body">
                                        <h5 className="card-title"><strong style={{color:'black'}}>{item.hotel_Name}</strong></h5>
                                        <p className="card-text">Room Numbers: {item.roomNumbers?.map(rn => rn.number).join(", ")}</p>
                                        <p className="card-text">Check-In: {new Date(item.checkInDate).toLocaleString()}</p>
                                        <p className="card-text">Check-Out: {new Date(item.checkOutDate).toLocaleString()}</p>
                                        <p className="card-text">Guests: {item.adults} Adults, {item.children} Children</p>
                                        <p className="card-text">Total Price: Rs. {item.totalPrice}</p>
                                </div>
                            </div>
                        ))
                    ):<><p style={{textAlign:'center'}}>No active cancelled reservations</p></>}
                </div>
                <div className="pDetails col-lg-4 col-md-6 col-sm-12">
                    <p style={{fontWeight:600, textAlign:'center'}}>payment details</p>
                    {getUser.paymentDetails?.length > 0 ?(
                        getUser.paymentDetails.map((item, index) => (
                            <div key={item._id} className="card">
                                <div className="card-body">
                                    <p className="card-text">Order_id: {item.razorpay_order_id}</p>
                                    <p className="card-text">payment_id: {item.razorpay_payment_id}</p>
                                </div>
                            </div>
                        ))
                    ):<><p style={{textAlign:'center'}}>No payment Details</p></>}
                </div>
            </div>
        </div>
        </>
    )
};
export default ViewCustomer;