import mongoose from "mongoose";
import {Rooms} from './rooms.js'
import dotenv from 'dotenv'

dotenv.config({path:"./process.env"});
console.log(process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Hotel's DataBase is Connected"))
  .catch((err) => console.log("Unable to connect to Database:", err));

const hotelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    images: { type: [String] },
    rating: { type: String, min: 0, max: 5 },
    rooms: { type: [String] },
    cheapestPrices: { type: Number, required: true },
    featured: { type: Boolean, default: false }
});

const Hotel = mongoose.model("Hotel", hotelSchema);

//Create Hotel
export const HotelCreate =  async (req, res) => {
    const newHotel = new Hotel(req.body);
    try {
        await newHotel.save();
        res.status(200).json(newHotel);
    } catch (err) {
        console.error("Error creating Hotel: ", err.message);
        res.status(500).json({message:"Error creatiing Hotel",err:err.message});
    }
};

//Update Hotel
export const HotelUpdate =  async (req, res) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!updatedHotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }
        res.status(200).json(updatedHotel);
    } catch (err) {
        res.status(500).json({ message: "Unable to update hotel", error: err });
    }
};

//Delete Hotel
export const HotelDelete = async(req, res)=>{
    try{
        await Hotel.findByIdAndDelete(
            req.params.id
        )
        res.status(200).json("Hotel deleted")
    }
    catch(err){
        res.status(500).json("Unbale to Delete Hotel", err)
    }
};

//get Hotel
export const getHotelById = async(req,res)=>{
    try{
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    }catch(err){
        res.status(500).json("Unbale to retreive the Hotel", err)
    }
};

//getAll Hotels
export const getAllHotels = async (req, res) => {
   try{
    const hotels = await Hotel.find({})
    res.status(200).json(hotels)
    } catch (err) {
        res.status(500).json("Unable to get the Hotels", err);
    }
};


//  To get hotel count by cities
export const countByCities =  async (req, res) => {
    const { cities } = req.query;
    const cityList = cities ? cities.split(",").filter(city => city.trim() !== "") : [];

    if (cityList.length === 0) {
        return res.status(400).json({ message: "No cities provided" });
    }

    try {
        const hotelCounts = await Hotel.aggregate([
            { $match: { city: { $in: cityList } } },
            { $group: { _id: "$city", count: { $sum: 1 } } },
            { $project: { city: "$_id", count: 1, _id: 0 } } // Rename "_id" to "city" and remove _id
        ]);
        
        res.status(200).json(hotelCounts);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ message: "Unable to get the hotel counts by city", err });
    }
};



//count By Type
export const countByType = async(req,res)=>{
    try{
        const hotelCount = await Hotel.countDocuments({type:"Hotel"})
        const apartmentCount = await Hotel.countDocuments({type:"apartment"})
        const resortCount = await Hotel.countDocuments({type:"resort"})
        const villaCount = await Hotel.countDocuments({type:"villa"})
        const cabinCount = await Hotel.countDocuments({type:"cabin"})
        res.status(200).json([
            {type : "hotel", count : hotelCount},
            {type : "apartment", count : apartmentCount},
            {type : "resort", count : resortCount},
            {type : "villa", count : villaCount},
            {type : "cabin", count : cabinCount}
        ]);
    }
    catch(err){
        res.status(500).json({message:"Unable to get City Hotels",err})
    }
};

//Types to Stay fetch
export const TypesOfStay = async(req,res) => {
    try{
        const { query } = req.query;
        const getHotels = await Hotel.find({type:query});
        res.status(200).json(getHotels);
    }
    catch(err){
        res.status(500).json({message: "Something went Wrong",err})
    }
};

//Hotel count
export const countByHotel = async(req,res) => {
    try{
        const HotelType = await Hotel.countDocuments({type: "Hotel"});
        res.status(200).json({type: "hotel", count: HotelType});
    }
    catch(err){
        res.status(200).json({message : "Unbale to get the Hotels"});
    }
};

//Apartment count
export const countByApartments = async(req,res) => {
    try{
        const apartmentType = await Hotel.countDocuments({type: "apartment"});
        res.status(200).json({type: "apartment", count: apartmentType});
    }
    catch(err){
        res.status(200).json({message : "Unbale to get the Apartments"});
    }
};

//Resort count
export const countByResorts = async(req,res) => {
    try{
        const resortType = await Hotel.countDocuments({type: "resort"});
        res.status(200).json({type: "Resort", count: resortType});
    }
    catch(err){
        res.status(200).json({message : "Unbale to get the Resorts"});
    }
};

//Cabin count
export const countbyCabin = async(req,res) => {
    try{
        const CabinType = await Hotel.countDocuments({type: "cabin"});
        res.status(200).json({type: "cabin", count: CabinType});
    }
    catch(err){
        res.status(500).json({message : "Unable to get the Cabins"})
    }
};

//Villas count
export const countbyVillas = async(req,res) => {
    try{
        const VillaType = await Hotel.countDocuments({type: "villa"});
        res.status(200).json({type: "villa", count: VillaType});
    }
    catch(err){
        res.status(500).json({message : "Unable to get the villas"})
    }
};


// Search hotels by city or hotel name or Stay type
export const search = async (req, res) => {
    const { query } = req.query;
    if (!query || query.trim() === "") {
        return res.status(200).json({message : "No search field"});
    }

    try {
        const hotels = await Hotel.find({
            $or: [
                { city: { $regex: query, $options: 'i' } }, 
                { name: { $regex: query, $options: 'i' } }, 
                { type: { $regex: query, $options: 'i'} }
            ]
        });
        res.status(200).json(hotels);
    } catch (err) {
        res.status(500).json({ message: "Unable to perform search", err });
    }
};

// search Hotel based on min and max price range criteria

export const priceCrtiteria = async(req, res) => {
    const {max, min, city} = req.query;
    const filterConditions = {
        city : { $regex: new RegExp(city, "i") }
    };

    if(min && max){
        filterConditions.cheapestPrices = {
            $gte: parseInt(min),
            $lte: parseInt(max)
        }
    }

    try{
        const hotels = await Hotel.find(filterConditions)
        res.status(200).json(hotels);
    }
    catch(err){
        res.status(500).json("Unable to get the City Hotels",err)
    }
};

 //fetching the Rooms based on Hotel_id
 export const FetchRoomsBasedOnHotelId = async(req,res) => {
    try{
        const hotel = await Hotel.findById(req.params.hotelid);
        const list = await Promise.all(
            hotel.rooms.map((room) => {
                return Rooms.findById(room)
            })
        );
        res.status(200).json(list);
    }
    catch(err){
        res.status(500).json({message : "Unable to get the rooms", err});
    }
 };


 //featured hotels
 export const featuredHotels = async(req, res) => {
    const {featured, limit} = req.query;
    
    const filterCondition = {};
    if(featured !== undefined){
        filterCondition.featured = featured == "true";
    }
    try{
        const hotels = await Hotel.find(filterCondition).limit(parseInt(limit) || 0);
        res.status(200).json(hotels);
    }
    catch(err){
        res.status(500).json(
            {message: "Error to filter the featured hotels"}
        )
    }
 };

 

export {Hotel}

