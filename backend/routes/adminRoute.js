import express from "express";
import { addDoctor, loginAdmin } from "../controller/adminController.js";
import upload from "../middlewares/multer.js";
import authAdmmin from "../middlewares/authAdnin.js";

const adminRouter = express.Router();

// Admin routes
adminRouter.post("/add-doctor", authAdmmin, upload.single("image"), addDoctor);
adminRouter.post("/login", loginAdmin); // Changed to POST instead of GET

export default adminRouter;
