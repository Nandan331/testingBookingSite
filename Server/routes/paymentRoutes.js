import express from "express";
import { checkout, getKey, paymentVerification } from "../controllers/payment.js"

const router = express.Router();

router.route("/checkout").post(checkout);
router.route("/paymentverifcations/:username").post(paymentVerification);
router.route("/getkey").get(getKey);

export default router