import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Details from './components/Details'; 

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/details/:id" element={<DetailsWrapper />} />
      </Routes>
      <Footer />
    </Router>
  );
}

function DetailsWrapper() {
  const { id } = useParams(); 
  return <Details id={id} />;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

export default App;