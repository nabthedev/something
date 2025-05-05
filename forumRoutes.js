const express = require("express");
const Forum = require("../models/Forum");
const Thread = require("../models/Thread");
const Reply = require("../models/Reply");

const router = express.Router();

// Get all forums
router.get("/", async (req, res) => {
  try {
    const forums = await Forum.find();
    res.json(forums);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch forums" });
  }
});

// Create a new forum
router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;
    const forum = new Forum({ name, description });
    await forum.save();
    res.status(201).json(forum);
  } catch (err) {
    res.status(500).json({ error: "Failed to create forum" });
  }
});

module.exports = router;
