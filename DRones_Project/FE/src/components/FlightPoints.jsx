import React, { useState } from "react";
import styles from "../styles/flight.module.css";

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
    <div className={styles.containerWrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>Flight Points Management</h2>

        {/* Updated form styling */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="name"
            value={newPoint.name}
            onChange={handleChange}
            placeholder="Point Name"
            className={styles.input}
            required
          />
          <input
            type="text"
            name="droneModel"
            value={newPoint.droneModel}
            onChange={handleChange}
            placeholder="Drone Model"
            className={styles.input}
            required
          />
          <button type="submit" className={styles.button}>
            Add Point
          </button>
        </form>

        <h3 className={styles.subtitle}>Flight Points List</h3>
        <ul className={styles.list}>
          {points.map((point, index) => (
            <li key={index} className={styles.listItem}>
              {point.name} - Drone Model: {point.droneModel}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FlightPoints;
