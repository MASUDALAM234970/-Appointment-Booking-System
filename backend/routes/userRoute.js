import express from "express";
import {
  bookAppointment,
  cancelAppointment,
  getProfile,
  listAppontments,
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
userRoute.get("/appointments", authUser, listAppontments);
userRoute.post("/cancel-appointment", authUser, cancelAppointment);

export default userRoute;
