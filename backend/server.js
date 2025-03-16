import express from "express";
import cors from "cors"; // اضافه کردن ماژول CORS

import authRoutes from "./routes/auth.route.js"
import movieRoutes from "./routes/movie.route.js"
import tvRoutes from "./routes/tv.route.js"
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import protectRoute  from "./middleware/protectRoute.js";
import searchRoutes from "./routes/search.route.js";

const app = express();
const PORT = ENV_VARS.PORT;

app.use(cors({ 
    origin: "http://localhost:5173", // یا دامنه‌ای که فرانت‌اند روی آن اجرا می‌شود
    credentials: true // اگر از کوکی استفاده می‌کنید
}));


app.use(express.json()); // will allow us to parse req.body
app.use(cookieParser());

app.use("/api/v1/auth" , authRoutes);
app.use("/api/v1/movie" ,protectRoute, movieRoutes);
app.use("/api/v1/tv" ,protectRoute, tvRoutes);
app.use("/api/v1/search" ,protectRoute, searchRoutes);


app.listen(PORT ,()=>{
    console.log('Server started at http://localhost:'+PORT);
    connectDB();
})
