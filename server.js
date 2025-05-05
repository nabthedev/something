const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/forum-site", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () =>
  console.log("Connected to MongoDB successfully")
);
mongoose.connection.on("error", (err) =>
  console.log("Failed to connect to MongoDB", err)
);

// Serve Static Files
app.use(express.static(path.join(__dirname)));

// API Routes
app.use("/api/users", require("./userRoutes"));
app.use("/api/forums", require("./forumRoutes"));

// Serve the main HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start Server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
