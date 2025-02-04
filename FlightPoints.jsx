import React, { useState } from "react";

const FlightPoints = () => {
  const [points, setPoints] = useState([]);
  const [newPoint, setNewPoint] = useState({ name: "", droneModel: "" });

  const handleChange = (e) => {
    setNewPoint({ ...newPoint, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPoint.name || !newPoint.droneModel) return;
    setPoints([...points, newPoint]);
    setNewPoint({ name: "", droneModel: "" });
  };

  return (
    <div className="container">
      <h2 className="title">Flight Points Management</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="name"
          value={newPoint.name}
          onChange={handleChange}
          placeholder="Point Name"
          className="input"
          required
        />
        <input
          type="text"
          name="droneModel"
          value={newPoint.droneModel}
          onChange={handleChange}
          placeholder="Drone Model"
          className="input"
          required
        />
        <button type="submit" className="button">
          Add Point
        </button>
      </form>

      <h3 className="subtitle">Flight Points List</h3>
      <ul className="list">
        {points.map((point, index) => (
          <li key={index} className="list-item">
            {point.name} - Drone Model: {point.droneModel}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlightPoints;

