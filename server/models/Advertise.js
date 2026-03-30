import mongoose from "mongoose";

const advertiseSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    mobile: String,
    company: String,
    city: String,
    subject: String,
    requirements: String
  },
  { timestamps: true }
);

export default mongoose.model("Advertise", advertiseSchema);