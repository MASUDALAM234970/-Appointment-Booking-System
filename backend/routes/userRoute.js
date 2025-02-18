import express from "express";
import { loginUser, registerUser } from "../controller/usercontrollet.js";

const userRoute = express.Router();

userRoute.post("/register", registerUser);
userRoute.post("/login", loginUser);
export default userRoute;
