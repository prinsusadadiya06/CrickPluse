import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// POST Contact Form
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const newContact = await Contact.create({
      name,
      email,
      subject,
      message
    });

    res.json({ message: "Message sent successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error sending message" });
  }
});

export default router;