import YearGroup from "../models/YearGroup.js";

// GET all grouped years
export const getYearGroups = async (req, res) => {
  try {
    const data = await YearGroup.find().sort({ range: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};