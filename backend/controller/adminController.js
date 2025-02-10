import doctorModel from "../models/doctorModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";

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

export { addDoctor };
