import React from "react";
import { Link } from "react-router-dom";



const Navbar = ({ user, handleLogout }) => {
  return (
    <nav style={{ background: "#333", padding: "10px", color: "white" }}>
      <ul style={{ display: "flex", listStyle: "none", gap: "15px" }}>
        <li><Link to="/" style={{ color: "white" }}>Home</Link></li>
        <li><Link to="/about" style={{ color: "white" }}>About Us</Link></li>
        <li><Link to="/contact" style={{ color: "white" }}>Contact</Link></li>
        <li><Link to="/flight-points" style={{ color: "white" }}>Flight Points</Link></li>
        {user && (
          <li>
            <button onClick={handleLogout} style={{ background: "red", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

