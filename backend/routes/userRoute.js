import express from "express";
import {
  bookAppointment,
  getProfile,
  loginUser,
  registerUser,
  updateProfile,
} from "../controller/usercontrollet.js";
import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";

const userRoute = express.Router();

userRoute.post("/register", registerUser);
userRoute.post("/login", loginUser);
userRoute.get("/get-profile", authUser, getProfile);
userRoute.put(
  "/update-profile",
  upload.single("image"),
  authUser,
  updateProfile
);

userRoute.post("/book-appointment", authUser, bookAppointment);

export default userRoute;
