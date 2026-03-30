import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
  content: String
}, { _id: false });

const aboutSchema = new mongoose.Schema({
  title: String,
  sections: [sectionSchema]
}, { timestamps: true });

export default mongoose.model("About", aboutSchema, "aboutus");