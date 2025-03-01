const express = require("express");
const dbSingleton = require("../dbSingleton");

const router = express.Router();

router.post("/", (req, res) => {
  const { name, email, message } = req.body;

  console.log("📩 Received request:", req.body);

  if (!name || !email || !message) {
    console.log("⛔ Missing fields:", { name, email, message });
    return res.status(400).json({ error: "All fields are required" });
  }

  const db = dbSingleton.getConnection();
  db.query(
    "INSERT INTO contact (name, email, message) VALUES (?, ?, ?)",
    [name, email, message],
    (err) => {
      if (err) {
        console.log("⛔ Database error:", err.message);
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: "Message saved successfully!" });
    }
  );
});

module.exports = router;
