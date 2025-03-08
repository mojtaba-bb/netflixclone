import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required :true,
        unique : true,

    },
    email:{
        type: String,
        required :true,
        unique : true,
    },
    password:{
        type: String,
        required :true,   
    },
    image:{
        type: String,
        default:""
    },
    searchHistory: [
        {
          id: Number,
          image: String,
          title: String,
          searchType: String,
          createdAt: { type: Date, default: new Date() }, // 🔥 اینجا `createdAt` رو مشخص کن
        }
      ]
})

export const User = mongoose.model('User' , userSchema);