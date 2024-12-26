import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCheckDates } from "../../context/CheckDates";
import { useAuthenticate } from "../../context/Authentication";
import "./reserve.css"
// import { setHours } from "react-datepicker/dist/date_utils";

function RoomLists({ hotelid }) {
    const { username } = useAuthenticate();
    const { InDate, OutDate } = useCheckDates();
    const [getRooms, setGetRooms] = useState([]);
    const [getHotel, setGetHotel] = useState({});
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [selectedRooms, setSelectedRooms] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [modalimages, setModalimages] = useState(null);

    //Rendering the Data
    useEffect(() => {
        fetchRooms();
    }, [hotelid]);

    //Rendering the Total Price
    useEffect(() => {
    const total = Math.ceil(calculateTotalPrice());
    setTotalPrice(total);
    }, [selectedRooms, InDate, OutDate]);

    //fetching the Data's based on hotel_id (Hotel Data , Rooms Data)
    const fetchRooms = async () => {
        try {
            const hotelResponse = await axios.get(`http://localhost:8000/hotels/getHotel/${hotelid}`);
            const roomResponse = await axios.get(`http://localhost:8000/hotels/fetchroomsbasedhotelid/${hotelid}`,
                {
                    withCredentials: true
                }
            );
            setGetRooms(roomResponse.data);
            setGetHotel(hotelResponse.data);
        } catch (err) {
            console.error("Something went wrong", err);
        }
    };

    //calculating total Price for selected rooms and checkIn-Date and checkOut-Date 
    const calculateTotalPrice = () => {
        if (!InDate || !OutDate) return 0;    // Calculate the number of nights
        const timeDiff = Math.abs(new Date(InDate) - new Date(OutDate)) / (1000 * 60 * 60 * 24);
        if (timeDiff <= 0) return 0; console.log("Time Difference in Days:", timeDiff);
        // Calculate total price
        const total = selectedRooms.reduce((acc, selectedId) => {
            const room = getRooms.find(r => 
                r.roomNumbers.some(rn => rn._id === selectedId)
            ); if (room) {
                console.log(`Room Price for Room ID ${selectedId}:`, room.price);
                return acc + room.price * timeDiff;
            }
            return acc;
        }, 0);
        return total;
    };
    
    
    //helper function to generate Date ranges
    function getDateRange(startDate, endDate) {
        const start = normalisation(startDate);
        const end = normalisation(endDate);
        const date = new Date(start.getTime());
        const dates = [];
        while (date <= end) {
            dates.push(new Date(date).getTime());
            date.setDate(date.getDate() + 1);
        }
        return dates;
    };


    //normalisation function
    const normalisation = (date) => {
        const normalized = new Date(date);
        normalized.setHours(0,0,0,0);
        return normalized
    };

    //Date ranges
    const alldates = getDateRange(InDate, OutDate)

    //availability check
    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailable.some(date => 
            alldates.includes(normalisation(date).getTime())
        );
        return !isFound
    };

    //checked Rooms
    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedRooms(
            checked ? [...selectedRooms, value]
                    : selectedRooms.filter((item) => item !== value)
        );
    };

    //getting the number of rooms
    const roomsSelected = () => {
        const selectedRoomNumbers = getRooms.flatMap(room =>
            room.roomNumbers.filter(rn => selectedRooms.includes(rn._id)).map(rn => rn.number)
        ); 
        return selectedRoomNumbers; 
    };
    const store = roomsSelected();


    //Modal effect
    const openModal = (image) => setModalimages(image);
    const closeModal = () => setModalimages(null);
    

    //reserving the Selected rooms with payment integration method 
    const reserveSelectedRooms = async () => {
        if(!InDate || !OutDate){
            return alert("Give a valid check-in Date and check-out Date");
        }
        if(totalPrice == 0){
            return alert("Please select rooms you want to stay");
        }
        
        try {
            const { data: { key } } = await axios.get("http://localhost:8000/payments/getKey");
            const { data: { order } } = await axios.post("http://localhost:8000/payments/checkout", {
                amount: totalPrice,
            });
            const options = {
                key,
                amount: order.amount,
                currency: "INR",
                name: "Hotel Booking",
                description: "Payment for selected Rooms",
                order_id: order.id,
                handler: async function (response) {
                    try {
                        const verifyResponse = await axios.post(
                            `http://localhost:8000/payments/paymentverifcations/${username}`,
                            {
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_signature: response.razorpay_signature,
                                reservation: {
                                    hotel_Name: getHotel.name,
                                    roomId: getRooms._id,
                                    roomNumbers: store.map(number => ({ number })),
                                    checkInDate : InDate,
                                    checkOutDate : OutDate,
                                    adults,
                                    children,
                                    totalPrice,
                                    payment_id : response.razorpay_payment_id
                                },
                            }
                        );
                        console.log("Payment verification successful:", verifyResponse);
                        try{
                            await Promise.all(
                                selectedRooms.map((roomId) => {
                                    const response = axios.put(`http://localhost:8000/rooms/updateAvailability/${roomId}`,{
                                        dates : alldates
                                    });
                                    return response.data;
                                })
                            );
                        }
                        catch(err){
                            console.log("Error unable to update the Unavailable property", err);
                            alert("Error unable to update the Unavailable property");
                        }
                    } catch (err) {
                        console.log("Error verifying payment:", err);
                        alert("Error verifying payment");
                    }
                },
                prefill: {
                    name: username,
                    email: "customer@example.com",
                    contact: "9999999999",
                },
                theme: {
                    color: "#3396cc",
                },
            };

            // Initialize Razorpay and handle payment failures
            const razor = new window.Razorpay(options);
            razor.on("payment.failed", function (response) {
                alert(`Payment failed: ${response.error.description}`);
                console.error("Payment failed details:", response);
            });

            razor.open();
        } catch (err) {
            console.error("Unable to initiate payment:", err);
            alert("Something went wrong while initiating the payment.");
        }
    };

    return (
        <>
            <div className="container" style={{display:'flex', flexDirection:'column'}}>
                <form>
                    <input
                        className=""
                        type="number"
                        min="1"
                        value={adults}
                        onChange={(e) => setAdults(Number(e.target.value))}
                        style={{textAlign:'center'}}
                    />
                    adult
                    <input
                        className=""
                        type="number"
                        min="0"
                        value={children}
                        onChange={(e) => setChildren(Number(e.target.value))}
                        style={{textAlign:'center'}}
                    />
                    children
                </form>
            </div>
            <div className="container hDetails">
                {getHotel ? (
                    <>
                    <div className="hiSection" style={{backgroundColor:'rgba(0,0,0,0.2)', padding:'3%'}}>
                        <h4><strong style={{color:'black'}}>{getHotel.name}</strong></h4>
                        <div className="image-grid">
                            {getHotel.images?.map(item => (
                                <> 
                                <img 
                                    src={item}
                                    alt={item.name}
                                    className="grid-image"
                                    onClick={() => openModal(item)}
                                />
                                </>
                            ))}
                        </div>
                    </div>
                    </>
                ):(
                    <p>No Hotel presented </p>
                )}
                {modalimages && (
                    <div className="image-modal" onClick={closeModal}>
                        <span className="close-model" onClick={closeModal}>
                            &times;
                        </span>
                        <img className="modal-content" src={modalimages}/>
                    </div>
                )}
                <div className="container">
                    <div className="roomsSection">
                        {getRooms.map((item, index) => (
                            <>
                            <div className="rdSection">
                                <h5><strong style={{color:'black'}}>{item.title}</strong></h5>
                                <p>{item.desc}</p>
                                <h6>Rs.<strong style={{color:'black'}}>{item.price}</strong><span>  (Base Price for 2 Adults)</span></h6>
                            </div>
                            <div className="rnSection">
                                {item.roomNumbers.map(rn => (
                                    <label className="room-checkbox">
                                    <input
                                        type="checkbox"
                                        value={rn._id}
                                        onChange={handleSelect}
                                        disabled = {!isAvailable(rn)}
                                    />
                                    <span>{rn.number}</span>
                                    </label>
                                ))}
                            </div>
                            </>
                        ))}
                    </div>
                </div>
                <p>check-in date {InDate?.toLocaleDateString()}, check-out date {OutDate?.toLocaleDateString()}</p>
                <h4>Total Price : Rs.{totalPrice}</h4>
                <button
                    className="btn btn-primary"
                    onClick={() => reserveSelectedRooms(totalPrice)}
                    style={{backgroundColor:'#0071c2'}}
                >
                    reserve selected rooms
                </button>
            </div>
        </>
    );
}
export default RoomLists;
