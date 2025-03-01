const express = require("express");
const { getMissions, addMission, deleteMission } = require("../controllers/missionController");

const router = express.Router();

// נתיב לקבלת כל המשימות
router.get("/", getMissions);

// נתיב להוספת משימה חדשה
router.post("/", addMission);

// נתיב למחיקת משימה לפי ID
router.delete("/:id", deleteMission);

module.exports = router;
