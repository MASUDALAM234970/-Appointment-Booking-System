import mongoose from "mongoose";

// Corrected 'unique' spelling
const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Fixed typo
    password: { type: String, required: true },
    image: { type: String, required: true },
    speciality: { type: String, required: true },
    degree: { type: String, required: true },
    experience: { type: String, required: true },
    about: { type: String, required: true },
    available: { type: Boolean, default: true },
    fees: { type: Number, required: true },
    address: { type: Object, required: true },
    date: { type: Number, required: true },
    slot_booked: { type: Object, default: {} },
  },
  { minimize: false }
);

// Proper model registration
const doctorModel = mongoose.model("doctor", doctorSchema);
// const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default doctorModel;
