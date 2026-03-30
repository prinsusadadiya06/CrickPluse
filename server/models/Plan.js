import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  features: [
    {
      type: String
    }
  ]
}, { timestamps: true });

export default mongoose.model("Plan", planSchema);