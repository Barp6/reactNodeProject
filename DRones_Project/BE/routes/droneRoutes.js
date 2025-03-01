const express = require("express");
const {
  getDrones,
  getDroneById,
  updateDroneById,
  deleteDroneById,
  addDrone,
} = require("../controllers/droneController");

const router = express.Router();

// נתיב לקבלת כל הרחפנים
router.get("/", getDrones);

router.post("/", addDrone);

router.get("/:id", getDroneById);

router.post("/:id", updateDroneById);

router.delete("/:id", deleteDroneById);

module.exports = router;
