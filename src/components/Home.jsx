import React from 'react';
import { Link } from 'react-router-dom';
function Home() {
  const elements = [
    { id: 1, name: 'DJI tello' },
    { id: 2, name: 'Delivery Drone' },
    { id: 3, name: 'Surveillance Drone' }
  ];

  return (
    <main>
      <h2>Drone Types</h2>
      <ul>
        {elements.map(element => (
          <li key={element.id}>
            <Link to={`/details/${element.id}`}>{element.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Home;


