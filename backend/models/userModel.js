import mongoose from "mongoose";
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, uniuque: true },
  password: { type: String, required: true },
  image: {
    type: String,
    default: "https://cdn-images-1.medium.com/max/800/0*lhjK_e5uZmJQ",
  },
  address: { type: Object, default: { line: "", line: "" } },
  gender: { type: Object, default: "Not Selected" },
  dob: { type: Object, default: "Not Selected" },
  phonw: { type: Object, default: "00000000" },
});
const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
