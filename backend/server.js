import express from "express";
import cors from "cors";
import "dotenv/config";
import { dbConnection } from "./config/mongodb.js";
import connectCloudinay from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRoute from "./routes/doctorRoute.js";
import userRoute from "./routes/userRoute.js";

// app config
const app = express();
const port = process.env.PORT || 5000;
// Connect to MongoDB
dbConnection();
connectCloudinay();
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(express.json()); // ✅ Parses incoming JSON requests
app.use(express.urlencoded({ extended: true })); //
//middleware
app.use(express.json());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization", "atoken"],
    credentials: true,
  })
);

//  api endPoint
app.get("/", (req, res) => {
  res.send("Hello World123");
});
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRoute);
app.use("/api/user", userRoute);

app.listen(port, () => {
  console.log(` Server is running on port ${port}`);
});
