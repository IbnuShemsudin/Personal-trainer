import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// --- COMPONENTS ---
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Programs from './components/Programs';
import About from './components/About';
import Experience from './components/Experience';
import Gallery from './components/Gallery';
import TransformationSlider from './components/TransformationSlider';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Success from './components/Success';

// --- AUTH & SYSTEM ---
import Login from './components/Admin/Login'; 
import AdminDashboard from './components/Admin/AdminDashboard';
import Register from './components/Register'; 
import SystemBoot from './components/SystemBoot'; // Import your new component

// --- LANDING PAGE COMPONENT ---
const LandingPage = ({ user, onLogout }) => (
  <div className="bg-zinc-950 selection:bg-emerald-500 selection:text-white relative min-h-screen">
    <Navbar user={user} onLogout={onLogout} />
    <main>
      <Hero />
      <Programs />
      <About />
      <Experience />
      <Gallery />
      <TransformationSlider />
      <FAQ />
      <Contact />
    </main>
    <Footer />
  </div>
);

// --- PROTECTED ROUTE LOGIC ---
const ProtectedRoute = ({ children, allowedRole }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user.role !== allowedRole && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

// --- MAIN APP COMPONENT ---
function App() {
  const [user, setUser] = useState(null);
  const [isBooting, setIsBooting] = useState(false);

  // Sync state with localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsBooting(true); // Trigger the Boot Animation on Login
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <Router>
      {/* 1. System Boot Overlay */}
      <AnimatePresence>
        {isBooting && (
          <SystemBoot 
            userName={user?.name} 
            onComplete={() => setIsBooting(false)} 
          />
        )}
      </AnimatePresence>

      <Routes>
        {/* PUBLIC ACCESS */}
        <Route path="/login" element={
          user && !isBooting ? (
            <Navigate to={user.role === 'admin' ? "/admin/dashboard" : "/"} replace />
          ) : (
            <Login onLoginSuccess={handleLoginSuccess} />
          )
        } />
        
        {/* Pass handleLoginSuccess to Register too so it boots after sign-up */}
        <Route path="/register" element={<Register onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/success" element={<Success />} />

        {/* PROTECTED: CLIENT HOME PAGE */}
        <Route path="/" element={
          <ProtectedRoute allowedRole="client">
            <LandingPage user={user} onLogout={handleLogout} />
          </ProtectedRoute>
        } />

        {/* PROTECTED: ADMIN DASHBOARD */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard onLogout={handleLogout} />
          </ProtectedRoute>
        } />

        {/* CATCH-ALL */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;