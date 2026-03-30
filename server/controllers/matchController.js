import Match from "../models/Match.js";

// Get all or filter by category
export const getMatches = async (req, res) => {
  try {
    const { category } = req.query;

    let filter = {};

    if (category && category !== "All Matches") {
      if (category === "T20 League") {
        filter = { type: "T20" }; 
      } else {
        filter = { category };
      }
    }

    const matches = await Match.find(filter).sort({ date: 1 });

    res.json(matches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Insert multiple matches (bulk)
export const addMatchesBulk = async (req, res) => {
  try {
    const matches = req.body;

    const result = await Match.insertMany(matches);

    res.json({
      message: "Matches inserted successfully",
      count: result.length
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Insert single match
export const addMatch = async (req, res) => {
  try {
    const match = new Match(req.body);
    const saved = await match.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};