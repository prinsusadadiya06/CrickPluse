const Advertise = require("../models/Advertise");

exports.createAdvertise = async (req, res) => {
  try {
    const data = req.body;

    const newEntry = new Advertise(data);
    await newEntry.save();

    res.status(201).json({ message: "Form submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};