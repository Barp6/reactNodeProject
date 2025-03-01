import React, { useState, useEffect } from "react";
import styles from "../styles/About.module.css";

const images = [
  "/assets/drone1.jpg",
  "/assets/drone2.jpg",
  "/assets/drone3.jpg",
];

const About = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.aboutWrapper}>
      <div className={styles.container}>
        <h1>About Us</h1>
        <p>
          Welcome to our drone project! Our goal is to provide an interactive
          platform that visualizes how drones fly from one point to another.
        </p>
        <h2>Our Mission</h2>
        <p>
          We strive to make drone technology accessible and easy to understand.
          Our project helps users explore various drone applications, flight
          paths, and real-time drone tracking.
        </p>
        <h2>Why Choose Us?</h2>
        <ul>
          <li> Interactive visualizations of drone movements</li>
          <li> Real-time drone tracking capabilities</li>
          <li> Educational resources about different drone types</li>
          <li> User-friendly interface with a modern design</li>
        </ul>
        <h2>Meet the Team</h2>
        <div className={styles.teamContainer}>
          <div className={styles.teamCard}>
            <img
              src="/assets/developer.jpg"
              alt="Developer"
              className={styles.teamImage}
            />
            <h3>Bar Pahima and Ilia Hromchenko</h3>
            <p>Softwares Engineeres & Drone Enthusiast</p>
          </div>
        </div>
        <h2>Gallery</h2>
        <div className={styles.gallery}>
          <img
            src={images[currentImageIndex]}
            alt="Drone"
            className={styles.animatedImage}
            style={{ width: "30%", height: "auto" }}
          />
        </div>
      </div>
    </div>
  );
};

export default About;
