import express from "express";
import dotenv from 'dotenv';
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors';
import userRoutes from "./routes/userRoutes.js"
import hotelRoutes from "./routes/hotelRoutes.js"
import roomRoutes from "./routes/roomRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js"
import verifyadmin from "./routes/verifyAdminRoutes.js"

dotenv.config({path:"./process.env"});
export const app = express();
app.use(cors(
    {
        origin:"http://localhost:3000", 
        methods:[ 'GET', 'POST', 'PUT', 'UPDATE', 'DELETE' ],
        credentials:true
    } 
))
app.use(express.json());
app.use(cookieParser());

app.use("/users",userRoutes);
app.use("/hotels",hotelRoutes);
app.use("/rooms",roomRoutes);
app.use("/payments",paymentRoutes);
app.use("/authverify",verifyadmin);