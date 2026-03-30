import Team from "../models/Team.js";

// GET ALL TEAMS
export const getTeams = async (req, res) => {
  try {
    const { category, search } = req.query;

    let filter = {};

    if (category) {
      filter.category = category;
    }

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    const teams = await Team.find(filter);

    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: "Error fetching teams" });
  }
};

// ADD TEAM
export const createTeam = async (req, res) => {
  try {
    const { name, code, category, players, country } = req.body;

    const team = new Team({
      name,
      code,
      category,
      players,
      country,
      logo: req.file ? req.file.filename : ""
    });

    await team.save();

    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ message: "Error creating team" });
  }
};