import jwt from 'jsonwebtoken';
import { ENV_VARS } from '../config/envVars.js';

export const generateTokenAndSetCookie = (userId , res) => {
    const token = jwt.sign({userId}, ENV_VARS.JWT_SECRET , {expiresIn:"30d"});
    const options = {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        expires: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000
        ),
        httpOnly:true, // prevent XSS attacks cross site scripting attacks, make cookie accessible only by the web server,
        sameSite:"strict", // prevent CSRF attacks cross site request forgery attacks, make cookie accessible only by the web server,
        secure: ENV_VARS.NODE_ENV !== "development",
    }
    res.cookie("jwt-netflix",token,options);
    return token;
}
