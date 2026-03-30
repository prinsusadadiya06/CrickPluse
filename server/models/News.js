import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  team: String,
  title: String,
  description: String,
  image: String,
  time: String
});

export default mongoose.model("News", newsSchema);