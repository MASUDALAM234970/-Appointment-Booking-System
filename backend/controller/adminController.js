import doctorModel from "../models/doctorModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const addDoctor = async (req, res) => {
  try {
    // Get the data from the request body
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;

    const imageFile = req.file; // Handle file upload

    //Validate input fields
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields.",
      });
    }

    // Check if doctor already exists
    const existingDoctor = await doctorModel.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({
        success: false,
        message: "Doctor with this email already exists.",
      });
    }
    // validatin emal format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "please enter a valid email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    // upload image to cloudinary
    // const imageUpload = await cloudinary.uploader.upload(
    //   (imageFile.path, { resource_type: "image" })
    // );
    // const imageUrl = imageUpload.secure_url;
    // Create a new doctor
    const newDoctor = new doctorModel({
      name,
      email,
      password: hashedpassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      // image: imageUrl, // Store file path
      available: true,
      date: new Date(),
      slot_booked: {},
    });

    await newDoctor.save();
    return res.status(201).json({
      success: true,
      message: "Doctor added successfully",
      doctor: newDoctor,
    });
  } catch (error) {
    console.error("Error adding doctor:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

//  API FOR ADMIN LOGIN

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and Password are required." });
    }
    console.log("Env Admin Email:", process.env.ADMIN_EMAIL);
    console.log("Env Admin Password:", process.env.ADMIN_PASSWORD);
    //console.log("Entered Email:", email);
    // console.log("Entered Password:", password);

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      return res
        .status(200)
        .json({ success: true, token, message: "Login successful" });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
export { addDoctor, loginAdmin };
