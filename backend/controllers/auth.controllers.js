import{User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
export async function signup(req ,res) {
    try {
        const {email,password,username} = req.body;
        if(!email || !password || !username){
            return res.status(400).json({success:false , msessage:"All fields are required"})
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({success:false , msessage:"Invalid email address"})
        }
        if(password.length < 6){
            return res.status(400).json({success:false , msessage:"Password must be atleast 6 characters"})
        }
        const existingUserByEmail = await
        User.findOne({email:email});
        if(existingUserByEmail){
            return res.status(400).json({success:false , msessage:"User with this email already exists"})
        }

        const existingUserByUsername = await
        User.findOne({username:username});
        if(existingUserByUsername){
            return res.status(400).json({success:false , msessage:"User with this username already exists"})
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password,salt);

        const PROFILE_PICS =  ["/avatar1.png","/avatar2.png","/avatar3.png"]
        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];
        const newUser = new User({email,password:hashedPassword,username,image});
        
        generateTokenAndSetCookie(newUser._id , res);
        await newUser.save();
        res.status(201).json({success:true , message:"User created successfully"});
     
        
        
    } catch (error) {
        console.log("Error in signup controller",error.message)
        return res.status(500).json({success:false , message:"Internal server error"});
        
    }
}


export async function login(req ,res) {
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({success:false , msessage:"All fields are required"})
        }
        const user = await User.findOne({email:email});
        if(!user){
            return res.status(404).json({success:false , msessage:"Invalid credentials"})
        }
        const isPasswordValid = bcrypt.compareSync(password,user.password);
        if(!isPasswordValid){
            return res.status(400).json({success:false , msessage:"Invalid credentials"})
        }
        generateTokenAndSetCookie(user._id , res);
        return res.status(200).json({success:true , message:"User logged in successfully"})
    } catch (error) {
        console.log("Error in login controller",error.message)
        return res.status(500).json({success:false , message:"Internal server error"});
    }
}

export async function logout(req ,res) {
    try {
        res.clearCookie("jwt-netflix");
        return res.status(200).json({success:true , message:"User logged out successfully"})
    } catch (error) {   
        console.log("Error in logout controller",error.message)
        return res.status(500).json({success:false , message:"Internal server error"});
    }
}