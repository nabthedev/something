const mongoose = require("mongoose");

const forumSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  threads: [{ type: mongoose.Schema.Types.ObjectId, ref: "Thread" }],
});

module.exports = mongoose.model("Forum", forumSchema);
