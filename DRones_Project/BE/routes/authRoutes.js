const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} = require("../controllers/authController");

const router = express.Router();

// רישום משתמש
router.post("/register", registerUser);

// התחברות משתמש
router.post("/login", loginUser);

// יציאת משתמש (Logout)
router.post("/logout", logoutUser);

// Retrieve current user from session
router.get("/session", getCurrentUser);

module.exports = router;
