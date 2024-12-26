import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import "./useraccount.css"; // Custom CSS for the underline effect
import { useAuthenticate } from "../../context/Authentication";

function UserAccount() {
    const { username, userId } = useAuthenticate();
    const [userDetails, setUserDetails] = useState({
        reservations: [],
        canceledReservations: [],
    });
    const [activeTab, setActiveTab] = useState("reservations");

    useEffect(() => {
        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/users/getUserDetailsById/${userId}`);
            setUserDetails(response.data || { reservations: [], canceledReservations: [] });
        } catch (err) {
            console.error("Unable to get the User Details", err);
        }
    };

    const cancelReservation = async (reserveId) => {
        try {
            await axios.post(`http://localhost:8000/users/cancelReservationsandUpdate/${username}/${reserveId}`);
            alert("Reservation cancelled successfully");
            fetchUserData();
        } catch (err) {
            console.error("Unable to cancel the reserved rooms", err);
            alert("Unable to cancel the reservation");
        }
    };

    return (
        <div className="container mt-4">
            {/* Tab navigation with underline effect */}
            <div className="tab-container">
                <div className="tabs">
                    <button
                        className={`tab ${activeTab === "reservations" ? "active" : ""}`}
                        onClick={() => setActiveTab("reservations")}
                    >
                        Reservations
                    </button>
                    <button
                        className={`tab ${activeTab === "canceledReservations" ? "active" : ""}`}
                        onClick={() => setActiveTab("canceledReservations")}
                    >
                        Cancelled Reservations
                    </button>
                </div>
                <div
                    className="tab-indicator"
                    style={{
                        transform: `translateX(${activeTab === "reservations" ? "0" : "100%"})`,
                    }}
                />
            </div>

            {/* Content */}
            <div>
                {activeTab === "reservations" ? (
                    <div className="content">
                        <h4 className="section-title">Active Reservations</h4>
                        {userDetails.reservations.length > 0 ? (
                            userDetails.reservations.map((item) => (
                                <div key={item._id} className="card reservation-card mb-3">
                                    <div className="card-body">
                                        <h5 className="card-title"><strong style={{color:'black'}}>{item.hotel_Name}</strong></h5>
                                        <p className="card-text">Room Numbers: {item.roomNumbers?.map(rn => rn.number).join(", ")}</p>
                                        <p className="card-text">Check-In: {new Date(item.checkInDate).toLocaleString()}</p>
                                        <p className="card-text">Check-Out: {new Date(item.checkOutDate).toLocaleString()}</p>
                                        <p className="card-text">Guests: {item.adults} Adults, {item.children} Children</p>
                                        <p className="card-text">Total Price: Rs. {item.totalPrice}</p>
                                        <p className="card-text">Payment Id: {item.payment_id}</p>
                                        <p><strong style={{color:'green'}}>Free cancellation from your profile</strong></p>
                                        <button 
                                            className="btn btn-danger btn-sm" 
                                            onClick={() => cancelReservation(item._id)}
                                        >
                                            Cancel Reservation
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-muted">No active reservations found</p>
                        )}
                    </div>
                ) : (
                    <div className="content">
                        <h4 className="section-title">Cancelled Reservations</h4>
                        {userDetails.canceledReservations.length > 0 ? (
                            userDetails.canceledReservations.map((item) => (
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
                        ) : (
                            <p className="text-muted">No cancelled reservations found</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserAccount;
