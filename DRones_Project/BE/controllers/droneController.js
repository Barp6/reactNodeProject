const dbSingleton = require("../dbSingleton");

const getDrones = (req, res) => {
  const sql = "SELECT * FROM drones";
  const db = dbSingleton.getConnection();

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

const getDroneById = (req, res) => {
  const sql = "SELECT * FROM drones where id = ?";
  const db = dbSingleton.getConnection();

  db.query(sql, [req.params.id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!results.length) {
      return res.status(404).json({ error: "Drone not found" });
    }
    res.json(results[0]);
  });
};

const updateDroneById = (req, res) => {
  const { model, weight, range_km, description } = req.body;
  const sql =
    "UPDATE drones SET model = ?,weight =?, range_km = ?, description = ? WHERE id = ?";
  const db = dbSingleton.getConnection();

  db.query(
    sql,
    [model, weight, range_km, description, req.params.id],
    (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({ updated: true });
    }
  );
};

const deleteDroneById = (req, res) => {
  const sql = "DELETE FROM drones WHERE id = ?";
  const db = dbSingleton.getConnection();

  db.query(sql, [req.params.id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ deleted: true });
  });
};

const addDrone = (req, res) => {
  const { model, weight, range_km, description } = req.body;
  const sql =
    "INSERT INTO drones (model,weight, range_km, description) VALUES (?,?,?,?)";
  const db = dbSingleton.getConnection();

  db.query(sql, [model, weight,range_km, description], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ updated: true });
  });
};

module.exports = {
  getDrones,
  getDroneById,
  updateDroneById,
  deleteDroneById,
  addDrone,
};
