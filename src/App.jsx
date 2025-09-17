import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Visualization from './pages/Visualization';
import About from './pages/About';
import Navbar from './components/Navbar.jsx';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/visualization" element={<Visualization />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}