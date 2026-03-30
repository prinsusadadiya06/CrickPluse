import mongoose from "mongoose";

const archiveSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    dateRange: String,
    isPostponed: {
      type: Boolean,
      default: false
    },
    category: {
      type: String,
      enum: ["international", "league", "domestic", "women"],
      required: true
    },
    year: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

const Archive = mongoose.model("Archive", archiveSchema);

export default Archive;