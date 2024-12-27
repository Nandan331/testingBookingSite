import express from "express"
import path from "path"
import {app} from "./app.js"
import Razorpay from "razorpay"

// const app = express();
export const instance = new Razorpay({
    key_id : process.env.RAZORPAY_KEY_ID,
    key_secret : process.env.RAZORPAY_KEY_SECRET

});

const __dirname = path.resolve();

if(process.env.NODE_ENV === "production"){
    app.use(express.static (path.join(__dirname,"../frontend/build")));

    app.get("*",(req,res) => {
        res.sendFile(path.resolve(__dirname,"../frontend/build","index.html"));
    })
};

const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log("Server is running in the Port 8000"))