import express from "express";
import {createRooms, updateRooms, deleteRooms, getRoomsbyhotelId, getAllRooms, reserveRooms, cancelRooms, updateAvailability, getRoomtype} from "../controllers/rooms.js"
import verifyAdmin from "../Admin/verifyAdmin.js";

const router = express.Router();

router.route("/createroom/:hotelid").post(verifyAdmin, createRooms);
router.route("/updateroom/:roomId").put(verifyAdmin, updateRooms);
router.route("/deleteroom/:roomId").delete(verifyAdmin, deleteRooms);
router.route("/getroomtypeByroomId/:roomId").get(getRoomtype);
router.route("/getroomsbyhotelid/:hotelid").get(getRoomsbyhotelId);
router.route("/getallrooms").get(getAllRooms);
router.route("/reserverooms/:roomId").post(reserveRooms);
router.route("/cancelrooms/:roomId").post(cancelRooms);
router.route("/updateAvailability/:roomId").put(updateAvailability);

export default router;