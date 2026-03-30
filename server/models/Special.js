import mongoose from "mongoose";

const specialSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  time: String
});

export default mongoose.model("Special", specialSchema);