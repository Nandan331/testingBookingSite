import express from "express";
import verifyAdmin from "../Admin/verifyAdmin.js";

const router = express.Router();

router.get("/auth/verifyadmin", verifyAdmin, (req, res) => {
    res.status(200).json({ message: "User is an admin" });
});

export default router;
