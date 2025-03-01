import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "../styles/Details.module.css";
import axios from "axios";

function Details() {
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user") || {});
  const isAdmin = user.role === "admin";
  const [droneDetails, setDroneDetails] = useState(null);

  const saveChanges = async (e) => {
    e.preventDefault();
    if (!isAdmin) {
      return false;
    }
    axios
      .post(`http://localhost:3000/api/drones/${id}`, droneDetails)
      .catch((error) => console.error("Error updating drone details:", error));
    return false;
  };

  const onDelete = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this drone?"
    );
    if (isConfirmed) {
      axios
        .delete(`http://localhost:3000/api/drones/${id}`)
        .then(() => {
          alert("Drone deleted successfully!");
          window.location.href = "/";
        })
        .catch((error) => console.error("Error deleting drone:", error));
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/drones/${id}`)
      .then((response) => setDroneDetails(response.data))
      .catch((error) => console.error("Error fetching drone details:", error));
  }, [id]);

  if (!droneDetails) {
    return <h2>Drone not found</h2>;
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
          placeholder="Drone Weight"
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
        {isAdmin && (
          <>
            <button className={styles.saveButton} type="submit">
              Save
            </button>
            <button
              className={styles.deleteButton}
              type="button"
              onClick={onDelete}
            >
              Delete
            </button>
          </>
        )}
      </form>
      <Link to="/" className={styles.backButton}>
        Back to Home
      </Link>
    </div>
  );
}

export default Details;
