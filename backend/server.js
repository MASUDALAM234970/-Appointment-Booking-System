import express from "express";
import cors from "cors";
import "dotenv/config";
import { dbConnection } from "./config/mongodb.js";

// app config

const app = express();
const port = process.env.PORT || 5000;

//middleware

app.use(express.json());
app.use(cors());

//  api endPoint

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`server  is running on port ${port}`);
});

dbConnection();
