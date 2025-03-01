import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Details.module.css";
import axios from "axios";

function AddDrone() {
  const user = JSON.parse(localStorage.getItem("user") || {});
  const isAdmin = user.role === "admin";
  const [droneDetails, setDroneDetails] = useState({
    model: "",
    weight: "",
    range_km: "",
    description: "",
  });

  const saveChanges = async (e) => {
    e.preventDefault();
    if (!isAdmin) {
      return false;
    }
    // Validate that all fields are filled
    if (
      !droneDetails.model.trim() ||
      !droneDetails.weight.trim() ||
      !droneDetails.range_km.trim() ||
      !droneDetails.description.trim()
    ) {
      alert("All fields are required!");
      return false;
    }

    // Validate numeric fields
    if (isNaN(droneDetails.weight) || isNaN(droneDetails.range_km)) {
      alert("Weight and Range must be numeric values!");
      return false;
    }
    axios
      .post(`http://localhost:3000/api/drones`, droneDetails)
      .then(() => {
        window.location.href = "/";
      })
      .catch((error) => console.error("Error inserting new drone:", error));
    return false;
  };

  if (!isAdmin) {
    window.location.href = "/";
  }

  return (
    <div className={styles.container}>
      <form action="#" className={styles.form} onSubmit={saveChanges}>
        <input
          type="text"
          placeholder="Drone Model"
          value={droneDetails.model}
          disabled={!isAdmin}
          onChange={(e) =>
            setDroneDetails((current) => ({
              ...current,
              model: e.target.value,
            }))
          }
        />
        <input
          type="text"
          placeholder="Drone weight"
          value={droneDetails.weight}
          disabled={!isAdmin}
          onChange={(e) =>
            setDroneDetails((current) => ({
              ...current,
              weight: e.target.value,
            }))
          }
        />
        <input
          type="text"
          placeholder="Drone Range"
          value={droneDetails.range_km}
          disabled={!isAdmin}
          onChange={(e) =>
            setDroneDetails((current) => ({
              ...current,
              range_km: e.target.value,
            }))
          }
        />
        <textarea
          placeholder="Drone Description"
          value={droneDetails.description}
          disabled={!isAdmin}
          onChange={(e) =>
            setDroneDetails((current) => ({
              ...current,
              description: e.target.value,
            }))
          }
        />
        <button className={styles.saveButton} type="submit">
          Save
        </button>
      </form>
      <Link to="/" className={styles.backButton}>
        Back to Home
      </Link>
    </div>
  );
}

export default AddDrone;
