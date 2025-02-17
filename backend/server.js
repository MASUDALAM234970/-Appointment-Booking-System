import express from "express";
import cors from "cors";
import "dotenv/config";
import { dbConnection } from "./config/mongodb.js";
import connectCloudinay from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";

// app config
const app = express();
const port = process.env.PORT || 5000;
// Connect to MongoDB
dbConnection();
connectCloudinay();

app.use(express.json()); // ✅ Parses incoming JSON requests
app.use(express.urlencoded({ extended: true })); //
//middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5174", // Allow your frontend origin
    methods: "GET,POST,PUT,DELETE", // Allow necessary HTTP methods
    allowedHeaders: ["Content-Type", "Authorization", "atoken"], // Allow the atoken header
    credentials: true,
  })
);

//  api endPoint
app.get("/", (req, res) => {
  res.send("Hello World123");
});
app.use("/api/admin", adminRouter);

app.listen(port, () => {
  console.log(` Server is running on port ${port}`);
});
