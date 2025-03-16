import{User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
export async function signup(req ,res) {
    try {
        const {email,password,username} = req.body;
        if(!email || !password || !username){
            return res.status(400).json({success:false , msessage:"تمامی فیلدها الزامی هستند"})
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({success:false , msessage:"آدرس ایمیل نامعتبر است"})
        }
        if(password.length < 6){
            return res.status(400).json({success:false , msessage:"رمز عبور باید حداقل 6 کاراکتر باشد"})
        }
        const existingUserByEmail = await
        User.findOne({email:email});
        if(existingUserByEmail){
            return res.status(400).json({success:false , msessage:"کاربری با این ایمیل قبلاً وجود دارد"})
        }

        const existingUserByUsername = await
        User.findOne({username:username});
        if(existingUserByUsername){
            return res.status(400).json({success:false , msessage:"کاربری با این نام‌کاربری قبلاً وجود دارد"})
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password,salt);

        const PROFILE_PICS =  ["/media/avatar1.png","/media/avatar2.png","/media/avatar3.png"]
        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];
        const newUser = new User({email,password:hashedPassword,username,image});
        
        generateTokenAndSetCookie(newUser._id , res);
        await newUser.save();
        res.status(201).json({success:true , message:"کاربر با موفقیت ایجاد شد"});
     
        
        
    } catch (error) {
        console.log("خطا در کنترلر ثبت‌نام",error.message)
        return res.status(500).json({success:false , message:"خطای داخلی سرور"});
        
    }
}


export async function login(req ,res) {
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({success:false , msessage:"تمامی فیلدها الزامی هستند"})
        }
        const user = await User.findOne({email:email});
        if(!user){
            return res.status(404).json({success:false , msessage:"اطلاعات وارد شده نامعتبر است"})
        }
        const isPasswordValid = bcrypt.compareSync(password,user.password);
        if(!isPasswordValid){
            return res.status(400).json({success:false , msessage:"اطلاعات وارد شده نامعتبر است"})
        }
        generateTokenAndSetCookie(user._id , res);
        return res.status(200).json({success:true , message:"کاربر با موفقیت وارد شد"})
    } catch (error) {
        console.log("خطا در کنترلر ورود",error.message)
        return res.status(500).json({success:false , message:"خطای داخلی سرور"});
    }
}

export async function logout(req ,res) {
    try {
        res.clearCookie("jwt-netflix");
        return res.status(200).json({success:true , message:"کاربر با موفقیت وارد شد"})
    } catch (error) {   
        console.log("خطا در کنترلر ورود",error.message)
        return res.status(500).json({success:false , message:"خطای داخلی سرور"});
    }
}

export async function authCheck(req ,res){
    try {
        res.status(200).json({success:true , user:req.user})
    } catch (error) {
        console.log(" خطا در کنترلر authCheck",error.message);
        res.status(500).json({success:false , message:"خطای داخلی سرور"})
    }
}