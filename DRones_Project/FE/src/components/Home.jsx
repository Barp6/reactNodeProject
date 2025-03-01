import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "../styles/Home.module.css";

const Home = () => {
  const [drones, setDrones] = useState([]);
  const user = JSON.parse(localStorage.getItem("user") || {});
  const isAdmin = user.role === "admin";

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/drones")
      .then((response) => setDrones(response.data))
      .catch((error) => console.error("Error fetching drones:", error));
  }, []);

  return (
    <div className={styles.container}>
      <h2>Drones</h2>
      {isAdmin && (
        <Link to={`/add-drone`}>
          <button className={styles.addDrone}>Add Drone</button>
        </Link>
      )}
      <ul className={styles.list}>
        {drones.map((drone) => (
          <li key={drone.id} className={styles.item}>
            <h3>
              {drone.model} ({drone.range_km}km)
            </h3>
            <Link
              to={`/details/${drone.id}`}
              className={`${styles.detailsButton} ${
                isAdmin ? styles.editButton : ""
              }`}
            >
              {!isAdmin && <span>View Details</span>}
              {isAdmin && <span>Edit</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
