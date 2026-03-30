import mongoose from "mongoose";

const yearGroupSchema = new mongoose.Schema(
  {
    range: {
      type: String,
      required: true,
    },
    years: {
      type: [Number],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("YearGroup", yearGroupSchema);