import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Rooms } from "./rooms.js";
import dotenv from 'dotenv'

dotenv.config()
mongoose.connect (process.env.MONGO_URI)
.then(res => console.log("User's database is connected"))
.catch(err => console.log("Server is not Running", err))

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    Admin: {
        type:Boolean,
        default:false
    },
    reservations:[
        {
            hotel_Name:{
                type: String,
                require: true
            },
            roomId:{
                type:String,
                required:true
            },
            roomNumbers:[
                {
                    number:Number
                }
            ],
            checkInDate:{
                type:Date,
                required:true
            },
            checkOutDate:{
                type:Date,
                required:true
            },
            adults:{
                type:Number,
                required:true
            },
            children:{
                type:Number,
                required:true
            },
            totalPrice:{
                type:Number,
                required:true
            },
            payment_id:{
                type:String,
                required:true
            }
        }
    ],
    canceledReservations: [
        {
            hotel_Name: {
                type: String,
                required: true
            },
            roomId: {
                type: String,
                required: true
            },
            roomNumber: [
                {
                    number:Number
                }
            ],
            checkInDate:{
                type:Date,
                required:true
            },
            checkOutDate:{
                type:Date,
                required:true
            },
            adults:{
                type:Number,
                required:true
            },
            children:{
                type:Number,
                required:true
            },
            totalPrice:{
                type:Number,
                required:true
            }
        },
        {timestamps:true}
    ],
    paymentDetails: [
        {
            razorpay_order_id: {
                type: String,
                required: true
            },
            razorpay_payment_id: {
                type: String,
                required: true
            },
            razorpay_signature: {
                type: String,
                required: true
            }
        },
        {timestamps:true}
    ]
},
{timestamps:true}
)

const User = new mongoose.model("Users", UserSchema);
 
//login
export const login =  async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return res.status(404).json("User not found");

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) return res.status(401).json("Invalid credentials");

        const token = jwt.sign({ id: user._id, Admin: user.Admin }, process.env.JWT_SECRET);
        const { password,Admin, ...userDetails } = user._doc;
                
        res.cookie("jwt_token", token, { httpOnly: true })
            .status(200).json({message:"user logged in successfully", details :{...userDetails}, Admin });
    } catch (err) {
        res.status(500).json({ message: "Login error", error: err.message });
    }
};

// Signup Route
export const sign_up =  async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);

        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(409).json({message:"User already exists"});

        user = new User(
            { username: req.body.username, 
                email: req.body.email, 
                password: hash 
            });
        await user.save();    
        const token = jwt.sign({id: user._id, Admin: user.Admin}, process.env.JWT_SECRET);
        res.cookie("jwt_token",token,{httpOnly:true})    
        const {password, ...otherdetails} = user._doc
        res.status(200).json({message : "signed up successfully",otherdetails});
    } catch (err) {
        res.status(500).json({ message: "Signup Error", error: err.message });
    }
};


//update
export const update =  async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    try {

        //hashing the password if it is existed in the request body
        let hash = null;
        if(req.body.password){
            hash = await bcrypt.hash(req.body.password, salt)
            req.body.password = hash
        }

        const updateduser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!updateduser) {
            return res.status(404).json({ message: "User not found" });
        }
        //recreating the token 
        const token = jwt.sign(
            {id:updateduser._id, Admin: updateduser.Admin},
            process.env.JWT_SECRET
        )
        //Hiding the sensitive fields
        const{ _id,password,Admin, ...otherdetails} = updateduser._doc
        res.cookie('access_token', token,{
            httpOnly:true
        })
        //showing the neccessary fields
        .status(200).json(otherdetails);
    } catch (err) {
        res.status(500).json({ message: "Unable to update User", error: err });
    }
};

//delete user
export const Delete =  async(req, res)=>{
    try{
        await User.findByIdAndDelete(
            req.params.id
        )
        res.status(200).json("User deleted")
    }
    catch(err){
        res.status(500).json({ message: "Unable to Delete User", error: err.message })
    }
};

//get User
export const getUser =  async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } 
    catch(error) {
        console.error("Error retrieving user:", error);
        res.status(500).json({ message: "Unable to retrieve the User" });
    }
};

//get userDetails by userId

export const getUserDetailsById =  async(req,res) => {
    try{
        const userid = req.params.userId;
        const user = await User.findById(userid);

        if(!user){
            return res.status(500).json({message : "No user found by this Name"})
        }
        const {password, Admin, ...otherdetails} = user._doc;
        res.status(200).json(otherdetails);
    }
    catch(error){
        console.error("Error retrieving user :",error);
        res.status(500).json({message : "Error occured, Unable to retrieve User", error})
    }

};

//pushing the details
export const Reserve =  async(req, res) => {
    try{
        const {reservation} = req.body;
         const user = await User.findOneAndUpdate(
        { username : req.params.username },
        {$push : {reservations : reservation }} ,
        { new: true }
    );
    res.status(200).json({ success: true, user})
    } 
    catch(err){
        res.status(500).json({ success: false, message: err.message });
    } 
};

// Canceling room Reservations from Username and reservationId
export const cancelReservationsandUpdate = async (req, res) => {
    const { username, reservationId } = req.params;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const reservation = user.reservations.id(reservationId);
        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }
        const roomNumbers = reservation.roomNumbers.map((room) => room.number);
        const updateResults = await Rooms.updateMany(
            { "roomNumbers.number": { $in: roomNumbers } },
            {
                $set: {
                    "roomNumbers.$[room].unavailable": [], 
                },
            },
            {
                arrayFilters: [
                    { "room.number": { $in: roomNumbers } },
                ],
                multi: true,
            }
        );

        if (updateResults.modifiedCount === 0) {
            return res
                .status(500)
                .json({ message: "Failed to update room availability for some or all rooms." });
        }

        // Add reservation to `canceledReservations`
        await User.updateOne(
            { username },
            {
                $push: {
                    canceledReservations: {
                        hotel_Name: reservation.hotel_Name,
                        roomId: reservation.roomId,
                        roomNumbers: reservation.roomNumbers.map((item) => ({
                            number: item.number,
                        })),
                        checkInDate: reservation.checkInDate,
                        checkOutDate: reservation.checkOutDate,
                        adults: reservation.adults,
                        children: reservation.children,
                        totalPrice: reservation.totalPrice,
                    },
                },
            }
        );

        // Remove reservation from `reservations`
        const deleteResult = await User.updateOne(
            { username },
            { $pull: { reservations: { _id: reservationId } } }
        );

        console.log("Reservation deletion result:", deleteResult);

        if (deleteResult.modifiedCount === 0) {
            return res.status(500).json({ message: "Failed to delete reservation from reservations array." });
        }

        res.status(200).json({
            message: "Reservation canceled successfully, and room availability updated.",
        });
    } catch (err) {
        console.error("Error in cancelReservationsandUpdate:", err);
        res.status(500).json({
            message: "Unable to cancel the reservation.",
            error: err.message,
        });
    }
};



//getAll users
export const getAllUsers = async(req,res) =>{
    try{
        const user = await User.find()
        res.json(user);
    }
    catch(err){
        res.status(500).json("Error retreiving the Data", err);
    }
};

export {User}
// export default router;

