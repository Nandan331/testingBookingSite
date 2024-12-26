import express from "express";
import { countByApartments, countbyCabin, countByCities, countByHotel, countByResorts, countByType, countbyVillas, featuredHotels, FetchRoomsBasedOnHotelId, getAllHotels, getHotelById, HotelCreate, HotelDelete, HotelUpdate, priceCrtiteria, search, TypesOfStay } from "../controllers/Hotel.js"
import verifyAdmin from "../Admin/verifyAdmin.js";

const router = express.Router();

router.route("/hotelcreate").post(verifyAdmin,HotelCreate);
router.route("/hotelupdate/:id").put(verifyAdmin,HotelUpdate);
router.route("/hoteldelete/:id").delete(verifyAdmin,HotelDelete);
router.route("/getHotel/:id").get(getHotelById);
router.route("/getAllHotels").get(getAllHotels);
router.route("/search").get(search);
router.route("/min/max/city").get(priceCrtiteria)
router.route("/countbycities").get(countByCities);
router.route("/countbytype").get(countByType);
router.route("/fetchroomsbasedhotelid/:hotelid").get(FetchRoomsBasedOnHotelId);
router.route("/featuredHotels/featured/limit").get(featuredHotels);
// Types 
router.route("/countbyhotel").get(countByHotel);
router.route("/countbyvilla").get(countbyVillas);
router.route("/countbyresort").get(countByResorts);
router.route("/countbycabin").get(countbyCabin);
router.route("/countbyapartments").get(countByApartments);
router.route("/hotelfetch").get(TypesOfStay);


export default router;