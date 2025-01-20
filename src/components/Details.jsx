import React from 'react';
import { Link } from 'react-router-dom';

function Details({ id }) {


  const droneDetails = {
    1: 'DJI tello: A four-rotor drone used for various applications.',
    2: 'Delivery Drone: Designed to deliver packages quickly and efficiently.',
    3: 'Surveillance Drone: Used for monitoring and security purposes.'
  };

  return (
    <main>
      <h2>Drone Details</h2>
      <p>{droneDetails[id]}</p>
      <Link to="/">Back to Home</Link>
    </main>
  );
}

export default Details;

