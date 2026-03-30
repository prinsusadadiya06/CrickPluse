import Archive from "../models/Archive.js";

// GET ARCHIVE (grouped by category)
export const getArchive = async (req, res) => {
  try {
    const { year } = req.query;

    const filter = {};

    if (year) filter.year = Number(year);

    const data = await Archive.find(filter).sort({ createdAt: -1 });

    const grouped = {};

    data.forEach(item => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push(item);
    });

    res.json(grouped);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// GET DISTINCT CATEGORIES
export const getCategories = async (req, res) => {
  try {
    const categories = await Archive.distinct("category");
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET YEAR 
export const getYears = async (req, res) => {
  try {
    const years = await Archive.distinct("year");
    res.json(years.sort());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};