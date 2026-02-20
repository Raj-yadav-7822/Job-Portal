import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

const app = express();

const PORT = process.env.PORT || 3000;



// ---------------- SECURITY ----------------


// Helmet (security headers)
app.use(helmet());


// Rate Limit
const limiter = rateLimit({

 windowMs: 15 * 60 * 1000,

 max: 100,

 message:{
  success:false,
  message:"Too many requests"
 }

});

app.use("/api", limiter);



// ---------------- CORS ----------------


const corsOption = {

 origin: process.env.FRONTEND_URL,

 credentials: true

};

app.use(cors(corsOption));



// ---------------- MIDDLEWARE ----------------


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



// ---------------- ROUTES ----------------


app.get("/", (req, res) => {
 return res.status(200).json({
  message: "API running",
  success: true

 });

});

//userRoute
app.use("/api/v1/user", userRoute);
// companyRoute
app.use("/api/v1/company", companyRoute);
//jobRoute
app.use("/api/v1/job", jobRoute);
//applicantsRoute
app.use("/api/v1/application", applicationRoute);



// ---------------- Server----------------
app.listen(PORT, async () => {
 await connectDB();
 console.log(`Server running on ${PORT}`);
});