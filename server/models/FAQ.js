import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
  title: String,
  items: [
    {
      question: String,
      answer: String
    }
  ]
});

export default mongoose.model("FAQ", faqSchema);