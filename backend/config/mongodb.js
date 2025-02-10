import mongoose from "mongoose";

export const dbConnection = () => {
  console.log(
    "Connecting to database:",
    process.env.MONGO_URL ? "URL Loaded" : "URL Not Found"
  );
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "Appointment-Booking-System",
    })
    .then(() => {
      console.log("Connected to database");
    })
    .catch((error) => {
      console.log("Error occured while connecting to database", error.message);
    });
};
