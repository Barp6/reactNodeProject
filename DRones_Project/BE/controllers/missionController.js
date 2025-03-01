const dbSingleton = require("../dbSingleton");

// קבלת כל המשימות
const getMissions = (req, res) => {
  const sql = "SELECT * FROM missions";
  const db = dbSingleton.getConnection();

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

// הוספת משימה חדשה
const addMission = (req, res) => {
  const { drone_id, mission_name, location } = req.body;
  if (!drone_id || !mission_name || !location) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = "INSERT INTO missions (drone_id, mission_name, location) VALUES (?, ?, ?)";
  const db = dbSingleton.getConnection();

  db.query(sql, [drone_id, mission_name, location], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "Mission added successfully", id: result.insertId });
  });
};

// מחיקת משימה לפי ID
const deleteMission = (req, res) => {
  const missionId = req.params.id;
  const sql = "DELETE FROM missions WHERE id = ?";
  const db = dbSingleton.getConnection();

  db.query(sql, [missionId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Mission deleted successfully" });
  });
};

module.exports = { getMissions, addMission, deleteMission };
