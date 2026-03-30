import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
  title: String,
  content: [String]
}, { _id: false });

const privacySchema = new mongoose.Schema({
  lastUpdated: String,
  sections: [sectionSchema]
}, { timestamps: true });

export default mongoose.model("Privacy", privacySchema, "privacy");