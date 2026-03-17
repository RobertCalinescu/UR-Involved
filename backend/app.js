/* user-registration 

User model
Register page
POST route for registration
Validation
Password hashing
Default role = student
Duplicate email check
Success redirect

*/

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../frontend/views"));

// Temporary home route for testing
app.get("/", (req, res) => {
  res.send("UR Involved backend is running.");
});

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/ur_involved")
  .then(() => {
    console.log("MongoDB connected successfully.");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });