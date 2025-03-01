import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import Details from "./components/Details";
import Login from "./components/Login";
import Register from "./components/Register";
import About from "./components/About";
import Contact from "./components/Contact";
import FlightPoints from "./components/FlightPoints";
import Navbar from "./components/Navbar";
import axios from "axios";
import AddDrone from "./components/AddDrone";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/auth/session", { withCredentials: true })
      .then((response) => {
        setUser(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      })
      .catch(() => {
        setUser(null);
        localStorage.removeItem("user");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      localStorage.removeItem("user");
    } catch (err) {
      console.error("Logout failed:", err.response?.data?.error || err.message);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Router>
      {/* מציג את הניווט רק אם המשתמש מחובר */}
      {user && <Navbar user={user} handleLogout={handleLogout} />}

      {/* הגדרת קונטיינר לכל הדפים כדי למנוע חיתוך */}
      <div className="app-container">
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/details/:id"
            element={user ? <Details /> : <Navigate to="/login" />}
          />
          <Route
            path="/add-drone"
            element={user ? <AddDrone /> : <Navigate to="/login" />}
          />
          <Route
            path="/about"
            element={user ? <About /> : <Navigate to="/login" />}
          />
          <Route
            path="/contact"
            element={user ? <Contact /> : <Navigate to="/login" />}
          />
          <Route
            path="/flight-points"
            element={user ? <FlightPoints /> : <Navigate to="/login" />}
          />

          {/* משתמשים לא מחוברים */}
          <Route
            path="/login"
            element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
