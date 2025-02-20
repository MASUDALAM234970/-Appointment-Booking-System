// import mongoose from "mongoose";
// const appointmentSchema = mongoose.Schema({
//   userId: { type: String, required: true },
//   docId: { type: String, required: true },
//   slotDate: { type: String, required: true },
//   slotTime: { type: String, required: true },
//   userDate: { type: Object, required: true },
//   docDate: { type: Object, required: true },
//   amoumt: { type: Number, required: true },
//   date: { type: Number, required: true },
//   cancelled: { type: Boolean, default: false },
//   payment: { type: Boolean, default: false },
//   isCompleted: { type: Boolean, default: false },
// });

// const Appointment =
//   mongoose.models.Appointment ||
//   mongoose.model("Appointment", appointmentSchema);
// export default Appointment;

import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema({
  userId: { type: String, required: true },
  docId: { type: String, required: true },
  slotDate: { type: String, required: true },
  slotTime: { type: String, required: true },
  userDate: { type: String, required: true }, // Fix: Changed type to String
  docDate: { type: String, required: true }, // Fix: Changed type to String
  amount: { type: Number, required: true }, // Fix: Corrected typo `amoumt` to `amount`
  date: { type: Number, required: true },
  cancelled: { type: Boolean, default: false },
  payment: { type: Boolean, default: false },
  isCompleted: { type: Boolean, default: false },
});

const Appointment =
  mongoose.models.Appointment ||
  mongoose.model("Appointment", appointmentSchema);

export default Appointment;
