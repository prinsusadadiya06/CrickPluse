import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
  title: String,
  content: [String]
}, { _id: false });

const termsSchema = new mongoose.Schema({
  lastUpdated: String,
  sections: [sectionSchema]
}, { timestamps: true });

export default mongoose.model("Terms", termsSchema, "terms");