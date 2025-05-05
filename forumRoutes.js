const express = require("express");
const Forum = require("./Forum");
const Thread = require("./Thread");
const Reply = require("./Reply");

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

// Get threads in a forum
router.get("/:forumId/threads", async (req, res) => {
  try {
    const threads = await Thread.find({ forum: req.params.forumId }).populate(
      "user",
      "username"
    );
    res.json(threads);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch threads" });
  }
});

// Create a thread
router.post("/:forumId/threads", async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    const thread = new Thread({
      title,
      content,
      user: userId,
      forum: req.params.forumId,
    });
    await thread.save();
    res.status(201).json(thread);
  } catch (err) {
    res.status(500).json({ error: "Failed to create thread" });
  }
});

// Add a reply to a thread
router.post("/:forumId/threads/:threadId/replies", async (req, res) => {
  try {
    const { content, userId } = req.body;
    const reply = new Reply({
      content,
      user: userId,
      thread: req.params.threadId,
    });
    await reply.save();

    // Add reply to the thread
    const thread = await Thread.findById(req.params.threadId);
    thread.replies.push(reply._id);
    await thread.save();

    res.status(201).json(reply);
  } catch (err) {
    res.status(500).json({ error: "Failed to add reply" });
  }
});

module.exports = router;
