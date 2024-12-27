import express from 'express'
import mongoose from 'mongoose'
import { Hotel } from './Hotel.js'
import dotenv from 'dotenv';

const router = express.Router()

dotenv.config();
mongoose.connect(process.env.MONGO_URI)
.then((res)=>console.log("Room's Database is connected"))
.catch((err)=>console.log("Unable to connect the Database",err))

const roomSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    }, 
    price: {
        type: Number,
        required: true
    },
    maxCount:{
        type: Number,
        required: true
    },
    desc:{
        type: String,
        required: true
    },
    roomNumbers:[{
        number: Number,
        unavailable: {type:[Date]}
    }]
})
const Rooms = new mongoose.model("rooms",roomSchema)

//Create Rooms
export const createRooms = async (req, res) => {
    const hotelId = req.params.hotelid;
    const newRoom = new Rooms(req.body);
    
    try {
        const savedRoom = await newRoom.save();
        
        // Update the hotel document and push the new room ID into the rooms array
        await Hotel.findByIdAndUpdate(hotelId,
             { 
                $push: { rooms: savedRoom._id } 
            });
        
        res.status(200).json(savedRoom);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ message: "Unable to create the room", error: err });
    }
};


//Update room
export const updateRooms = async(req,res)=>{
    try{
        const updatedRoom = await Rooms.findByIdAndUpdate(
            req.params.roomId,
            { $set: req.body },
            { new: true }
        )
        if(!updatedRoom){
            return res.status(500).json("Unable to update the room")
        }
        res.status(200).json(updatedRoom)
    }
    catch(err){
        res.status(500).json("Some error",  err)
    }
};

//Delete Room
export const deleteRooms = async(req,res)=>{
    try{
        await Rooms.findByIdAndDelete(
            req.body.roomId
        )
        res.status(200).json({message:"Room has been Deleted"})
    }
    catch(err){
        res.status(500).json("Unable to Delete the Room")
    }
};

//get Roomtype by roomId
export const getRoomtype = async(req, res) => {
    const {roomId} = req.params;
    try{
        const getRoom = await Rooms.findById(roomId);
        res.status(200).json(getRoom);

    }
    catch(err){
        res.status(500).json(
            {message : "Unable to retreive the Room type", err}
        );
    }
};

//getRoomById
export const getRoomsbyhotelId = async(req,res)=>{
    try{
        const room = await Rooms.findById(req.params.hotelid)
        res.status(200).json(room)
    }
    catch(err){
        res.status(500).json("Unable to retrieve the Room",err)
    }
};

//get All Rooms
export const getAllRooms = async(req,res)=>{
    try{
       const rooms = await Rooms.find({})
       res.status(200).json(rooms)
    }
    catch{
        res.status(500).json("Unbale to get Rooms",err)
    }
};

//Reserve rooms
export const reserveRooms = async (req, res) => {
    const { roomNumber, checkInDate, checkOutDate } = req.body;
    const roomId = req.params.roomId;

    try {
        const room = await Rooms.findById(roomId);
        const roomNumberObj = room.roomNumbers.find(rn => rn.number === roomNumber);
        if (!roomNumberObj) {
            return res.status(404).json({ message: "Room number not found" });
        }
        
        // Update unavailable dates
        const dates = getDateRange(new Date(checkInDate), new Date(checkOutDate));
        roomNumberObj.unavailable.push(...dates);

        await room.save();
        res.status(200).json({ message: "Room reserved successfully", roomNumberObj });
    } catch (err) {
        res.status(500).json({ message: "Error reserving room", error: err });
    }
};

function getDateRange(startDate, endDate) {
    const dates = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
}

// Cancel Room Reservation
export const cancelRooms =  async (req, res) => {
    const { roomNumber, checkInDate, checkOutDate } = req.body;

    try {
        const room = await Rooms.findById(req.params.roomId);

        // Find the specific room number object
        const roomNumberObj = room.roomNumbers.find(rn => rn.number === roomNumber);
        if (!roomNumberObj) {
            return res.status(404).json({ message: "Room number not found" });
        }

        // Calculate date range to be removed from unavailable dates
        const cancelDates = getdateRange(new Date(checkInDate), new Date(checkOutDate));
        
        // Filter out the cancelDates from the unavailable array
        roomNumberObj.unavailable = roomNumberObj.unavailable.filter(
            date => !cancelDates.some(cancelDate => cancelDate.getTime() === new Date(date).getTime())
        );

        await room.save();
        res.status(200).json({ message: "Room reservation canceled successfully", roomNumberObj });
    } catch (err) {
        res.status(500).json({ message: "Error canceling reservation", err });
    }
};

// Helper function to generate date range array
function getdateRange(startDate, endDate) {
    const dates = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
}

///availability and unavailability of rooms


//  export const updateAvailability = async (req, res) => {
//     const { roomId } = req.params;
//     const { roomNumbers, dates } = req.body;
//     try {
//         const room = await Rooms.findById(roomId);

//         roomNumbers.forEach((roomNumber) => {
//             const roomNumberObj = room.roomNumbers.find(rn => rn.number === roomNumber);
//             if (roomNumberObj) {
//                 roomNumberObj.unavailable.push(...dates);
//             }
//         });

//         await room.save();
//         res.status(200).json({ success: true, room });
//     } catch (err) {
//         res.status(500).json({ success: false, message: "Error updating room availability", error: err });
//     }
// };

export const updateAvailability = async(req, res) => {
    try{
        await Rooms.updateOne(
            {"roomNumbers._id" : req.params.roomId},
            {
                $push: {
                    "roomNumbers.$.unavailable":req.body.dates
                }
            }
        );
        res.status(200).json(
            { success: true, 
              message: "Rooms unavailablity has been updated"
            })
    }
    catch(err){
        res.status(500).json(
            {message: "Unable to add dates to the unavailable property"}
        )
    }
};


// export const updateAvailability = async(req,res) =>{
//     const {roomId, roomNumber, dates} = req.body;
//     try{
//         const room = await Rooms.findOneAndUpdate(
//             {_id: roomId, "roomNumbers.number": roomNumber},
//             {$addToSet: {"roomNumbers.$.unavailable":{$each: dates}}},
//             {new :true}
//         );
//         res.status(200).json({ success: true, room});
//     }catch(err){
//         res.status(200).json({ success: false, message: "Error to store the Room Details", error: err})
//     }
// };

export { Rooms }
// export default router
