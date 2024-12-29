import express from "express"
import path from "path"
import {app} from "./app.js"
import Razorpay from "razorpay"

export const instance = new Razorpay({
    key_id : process.env.RAZORPAY_KEY_ID,
    key_secret : process.env.RAZORPAY_KEY_SECRET

});


const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log("Server is running in the Port 8000"))