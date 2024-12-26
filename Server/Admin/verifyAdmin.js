import jwt from 'jsonwebtoken'
import {User} from "../controllers/user.js"


const verifyAdmin = async(req, res, next) => {
    try{
        //requesting token from the cookies
        const token = req.cookies.jwt_token;

        //checking token is available or not
        if(!token){
            return res.status(401).json({ message : "Access denied no Token Available" });
        }

        //decoding token
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        //finding user._id based on the token
        const user = await User.findById(decode.id);

        //checking user available or not
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }

        //checking user is valid Admin credential or not
        if(!user.Admin){
            return res.status(403).json({ message: "Access denied, Only Admins are allowed" })
        }

        //call the next middle ware
        next();
    }
    catch(err){
        console.error("Error verifying Admin", err);
        res.status(500).json(
            {message : "Failed to verify Admin"},
            {error : err.message}
        )
    }
};
export default verifyAdmin;