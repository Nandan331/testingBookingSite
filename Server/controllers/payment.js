import {instance} from '../index.js'
import mongoose from 'mongoose'
import crypto from "crypto"
import {User} from "./user.js";
import dotenv from 'dotenv';

dotenv.config();
mongoose.connect(process.env.MONGO_URI)
.then(res => console.log("Payments server is connected"))
.catch((err) => console.log("Server is not connected"));


const paymentSchema = new mongoose.Schema({
    razorpay_order_id: {
        type: String,
        required: true
    },
    razorpay_payment_id: {
        type: String,
        require: true
    },
    razorpay_signature: {
        type: String,
        required: true
    }
},{timestamps: true})

export const Payment = mongoose.model("Payment", paymentSchema);

//creating order in Server
export const checkout = async(req, res) => {
    const options = {
        amount : Number(req.body.amount * 100),
        currency : "INR",
    };

    const order = await instance.orders.create(options);
    console.log(order);
    res.status(200).json({
        success: true,
        order
    });

};

//payment verification
export const paymentVerification = async(req, res) => {
try{
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, reservation } = req.body;
    const {username} = req.params;
    console.log("Payment Order body: ",req.body);
    if( !razorpay_order_id || !razorpay_payment_id || !razorpay_signature ){
        console.log("Missing payment fields");
         return res.status(400).json({suceess: false,message: "Missing payment fields"});
    }
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256',process.env.RAZORPAY_KEY_SECRET)
                            .update(body.toString())
                            .digest('hex')
                            console.log("sign received" ,razorpay_signature);
                            console.log("sign generated", expectedSignature);
    
    const isAuthenticate = expectedSignature === razorpay_signature;
    if(isAuthenticate){      
        try{
            const paymentCreate = await Payment.create({
                razorpay_order_id, razorpay_payment_id, razorpay_signature
            })
            const updateUser = await User.findOneAndUpdate({username},{
                $push:{
                    paymentDetails: {
                        razorpay_payment_id, razorpay_order_id, razorpay_signature
                    },
                    reservations : reservation
                }
            },
            {new: true}
        );

        if(updateUser){
            console.log("Reservation successfully added to user data", updateUser)
            return res.status(200).json({
                paymentCreate,
                updateUser,
                success: true,
                message: "Payment verified and reservation stored successfully"
            });
        }else{
            console.log("User not Found")
            return res.status(404).json({
                success: false, 
                message: "User not found"
            });
        }
        }
        catch(err){
            console.error("Error updating user reservation details" ,err)
            res.status(500).json({
                success: false,
                message: "Error updating reservation details"
            });
        }
    } else{
        res.status(400).json({ success: false, message: "Wrong validation" });
    }
}
catch(err){
    console.error("Error payment Verification", err);
    res.status(500).json({ success: false, message: "Error while payment verification"});
}
    
};

//getting key
export const getKey = async(req, res) => {
    res.status(200).json({key : process.env.RAZORPAY_KEY_ID});
}


