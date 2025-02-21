import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import Appointment from "../models/apponitmentModel.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter all the fields" });
    }
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    }
    // Check if doctor already exists
    const existingDoctor = await userModel.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists.y",
      });
    }
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }
    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userData = {
      name,
      email,
      password: hashedPassword,
    };
    const newUser = new userModel(userData);
    const user = await newUser.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({
      success: true,
      message: "User registered successfully!",
      token,
    });
  } catch (error) {
    console.log("Error in register user controller:", error);
  }
};
// API for user login

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Email not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.json({
        success: true,
        message: "Login successful!",
        token,
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }
  } catch (error) {
    console.log("Error in login user controller:", error);
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.userId; // ✅ Extract userId correctly
    console.log("User ID from Middleware:", userId);

    // ✅ Fetch user data excluding password
    const userData = await userModel.findById(userId).select("-password");

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "User profile fetched successfully!",
      userData,
    });
  } catch (error) {
    console.error("Error in GetProfile user controller:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// API  to update user profile
// const updateProfile = async (req, res) => {
//   try {
//     const { userId } = req.body;
//     console.log("User ID from body:", userId);

//     // const { name, phone, address, dob, gender } = req.body;
//     // console.log(userId);

//     const { _id, name, phone, address, dob, gender } = req.body;
//     console.log("User ID from body:", _id); // Ensure it prints the correct value
//     const imageFile = req.file;
//     if (!name || !phone || !dob || !gender) {
//       return res.json({
//         success: false,
//         message: "Please enter all the fields",
//       });
//     }
//     await userModel.findByIdAndUpdate(userId, {
//       name,
//       phone,
//       address: JSON.parse(address),
//       dob,
//       gender,
//     });

//     if (imageFile) {
//       const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
//         resource_type: "file",
//       });
//       const imageUrl = imageUpload.secure_url;
//       await userModel.findByIdAndUpdate(userId, { image: imageUrl });
//     }

//     res.json({ success: true, message: "Profile updated successfully!" });
//   } catch (error) {
//     console.error("Error in Update Profile user controller:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

const updateProfile = async (req, res) => {
  try {
    const userId = req.userId; // ✅ Extract userId from middleware
    //onsole.log("User ID from Middleware:", userId);

    const { name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.status(400).json({
        success: false,
        message: "Please enter all required fields",
      });
    }

    // ✅ Convert address to JSON safely
    let parsedAddress = {};
    try {
      parsedAddress = address ? JSON.parse(address) : {};
    } catch (err) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid address format" });
    }

    // ✅ Update user details in DB
    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: parsedAddress,
      dob,
      gender,
    });

    // ✅ Handle image upload (if provided)
    if (imageFile) {
      try {
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
          resource_type: "image", // Ensure image type
        });
        const imageUrl = imageUpload.secure_url;
        await userModel.findByIdAndUpdate(userId, { image: imageUrl });
      } catch (uploadError) {
        return res
          .status(500)
          .json({ success: false, message: "Image upload failed" });
      }
    }

    res.json({ success: true, message: "Profile updated successfully!" });
  } catch (error) {
    console.error("Error in Update Profile user controller:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
//API to book appointment
// const bookAppointment = async (req, res) => {
//   try {
//     const userId = req.userId;
//     console.log("User ID ", userId);

//     const { docId, slotDate, slotTime } = req.body;
//     const docData = await doctorModel.findById(docId).select("-password");
//     if (!docData.available) {
//       return res.status(400).json({
//         success: false,
//         message: "Doctor not available",
//       });
//     }
//     // Checking for slot availability
//     const slot_booked = {}; // Declare the object before using it

//     if (slots_booked[slotDate]) {
//       if (slots_booked[slotDate].includes(slotTime)) {
//         return res.status(400).json({
//           success: false,
//           message: "Slot not available",
//         });
//       } else {
//         slots_booked[slotDate].push(slotTime);
//       }
//     } else {
//       slots_booked[slotDate] = [];
//       slots_booked[slotDate].push(slotTime);
//     }

//     const userData = await userModel.findById(userId).select("-password");
//     delete docData.slot_booked;
//     const appointmentData = {
//       userId,
//       docId,
//       userData,
//       docData,
//       amount: docData.fees,
//       slotTime,
//       slotDate,
//       date: Date.now(),
//     };
//     const newAppointment = new Appointment(appointmentData);
//     await newAppointment.save();
//     // save new slot data in docData
//     await doctorModel.findByIdAndUpdate(docId, { slot_booked });
//     res.json({
//       success: true,
//       message: "Appointment booked successfully",
//     });
//   } catch (error) {
//     console.error("Error in Book Appointment user controller:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// const slots_booked = {}; // Define globally

// const bookAppointment = async (req, res) => {
//   try {
//     const userId = req.userId;
//     console.log("User ID ", userId);

//     const { docId, slotDate, slotTime } = req.body;

//     // Fetch doctor details and convert to plain object
//     const docData = await doctorModel
//       .findById(docId)
//       .select("-password")
//       .lean();
//     if (!docData) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Doctor not found" });
//     }

//     if (!docData.available) {
//       return res.status(400).json({
//         success: false,
//         message: "Doctor not available",
//       });
//     }

//     // Checking for slot availability
//     if (!slots_booked[slotDate]) {
//       slots_booked[slotDate] = []; // Initialize if not exists
//     }

//     if (slots_booked[slotDate].includes(slotTime)) {
//       return res.status(400).json({
//         success: false,
//         message: "Slot not available",
//       });
//     }

//     // Mark slot as booked
//     slots_booked[slotDate].push(slotTime);

//     // Fetch user data
//     const userData = await userModel.findById(userId).select("-password");
//     if (!userData) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });
//     }

//     // Remove slot_booked before saving appointment
//     delete docData.slot_booked;

//     // Create appointment object
//     const appointmentData = {
//       userId,
//       docId,
//       userData,
//       docData,
//       amount: docData.fees,
//       slotTime,
//       slotDate,
//       docDate: slotDate, // Ensure docDate is included
//       userDate: slotDate, // Ensure userDate is included
//       date: Date.now(),
//     };

//     const newAppointment = new Appointment(appointmentData);
//     await newAppointment.save();

//     // Save new slot data in doctor model
//     await doctorModel.findByIdAndUpdate(docId, { slot_booked: slots_booked });

//     res.json({
//       success: true,
//       message: "Appointment booked successfully",
//     });
//   } catch (error) {
//     console.error("Error in Book Appointment user controller:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

const slots_booked = {}; // Define globally

const bookAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    console.log("User ID ", userId);

    const { docId, slotDate, slotTime, docDate, userDate } = req.body;

    // Fetch doctor details
    const docData = await doctorModel
      .findById(docId)
      .select("-password")
      .lean();
    if (!docData) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    if (!docData.available) {
      return res
        .status(400)
        .json({ success: false, message: "Doctor not available" });
    }

    // Checking for slot availability
    if (!slots_booked[slotDate]) {
      slots_booked[slotDate] = []; // Initialize if not exists
    }

    if (slots_booked[slotDate].includes(slotTime)) {
      return res
        .status(400)
        .json({ success: false, message: "Slot not available" });
    }

    // Mark slot as booked
    slots_booked[slotDate].push(slotTime);

    // Fetch user data
    const userData = await userModel.findById(userId).select("-password");
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Create appointment object
    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      docDate,
      userDate,
      date: Date.now(),
    };

    const newAppointment = new Appointment(appointmentData);
    await newAppointment.save();

    // Save new slot data in doctor model
    await doctorModel.findByIdAndUpdate(docId, { slot_booked: slots_booked });

    res.json({
      success: true,
      message: "Appointment booked successfully",
    });
  } catch (error) {
    console.error("Error in Book Appointment user controller:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const listAppontments = async (req, res) => {
  try {
    const userId = req.userId;
    const appointments = await Appointment.find({ userId });
    // const appointments=await Appointment.find({userId}).sort({date:-1});
    res.json({ success: true, appointments });
  } catch (error) {
    console.error("Error in list appointments user controller:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppontments,
};
