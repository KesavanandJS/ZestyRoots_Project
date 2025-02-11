import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import LoginSignup from './components/LoginSignup';
import About from './components/About';
import Contact from './components/Contact';
import BuyerPage from './components/BuyerPage';

function App() {
  return (
    <Router>
      <div className="App">
        <AnnouncementBar />
        <MainContent />
      </div>
    </Router>
  );
}

function MainContent() {
  const location = useLocation();

  return (
    <>
      {/* Render Navbar only if not on the BuyerPage */}
      {location.pathname.startsWith("/buyer") ? null : <Navbar />}
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/dashboard/:userId" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/buyer/:userId" element={<BuyerPage />} />
        {/* Redirect to login if no route matches */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
