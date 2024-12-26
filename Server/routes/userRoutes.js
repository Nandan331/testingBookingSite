import express from "express";
import { login, sign_up, cancelReservationsandUpdate, Delete, update, getAllUsers, getUserDetailsById, getUser } from "../controllers/user.js";
import verifyAdmin from "../Admin/verifyAdmin.js"

const router = express.Router();

router.route("/login").post(login);
router.route("/sign_up").post(sign_up);
router.route("/delete/:id").delete(Delete);
router.route("/update/:id").put(update);
router.route("/getAllUsers").get(verifyAdmin,getAllUsers);
router.route("/getUserDetailsById/:userId").get(getUserDetailsById);
router.route("/getUser/:userId").get(getUser);
router.route("/cancelReservationsandUpdate/:username/:reservationId").post(cancelReservationsandUpdate);

export default router;



