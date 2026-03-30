import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
  {
    id: String,
    date: String,
    series: String,
    title: String,
    venue: String,
    time: String,
    gmtTime: String,
    team1: String,
    team1Code: String,
    team2: String,
    team2Code: String,
    score: String,
    status: String,
    scores: {
      team1: String,
      team2: String
    },
    overs: {
      team1: Number,
      team2: Number
    },
    type: String,
    category: {
      type: String,
      enum: ["International", "T20 League", "Domestic", "Women"]
    }
  },
  { timestamps: true }
);

export default mongoose.model("Match", matchSchema);