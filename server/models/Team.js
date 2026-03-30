import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: String,
  code: String,
  players: Number,
  category: String,
  logo: String, 
  country: String,
}, { timestamps: true });

export default mongoose.model("Team", teamSchema);