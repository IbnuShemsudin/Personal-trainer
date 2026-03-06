import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import TelegramFloat from './components/TelegramFloat';
import LandingPage from './components/LandingPage'; // Added Landing Page

// --- AUTH & SYSTEM ---
import Login from './components/Admin/Login'; 
import AdminDashboard from './components/Admin/AdminDashboard';
import CommsPage from './components/Admin/CommsPage'; 
import Register from './components/Register'; 
import SystemBoot from './components/SystemBoot';

// --- HELPER: SCROLL TO TOP ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- HOME PAGE COMPONENT (INTERNAL) ---
const HomePage = ({ user, onLogout }) => (
  <div className="bg-zinc-950">
    <Hero />
    <Experience />
    <TransformationSlider />
    <FAQ />
  </div>
);

// --- PROTECTED ROUTE LOGIC ---
const ProtectedRoute = ({ children, allowedRole }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRole && user.role !== allowedRole && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const [user, setUser] = useState(null);
  const [isBooting, setIsBooting] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsBooting(true);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    window.location.reload();
  };

  return (
    <Router>
      <ScrollToTop />
      
      <AnimatePresence mode="wait">
        {isBooting && (
          <SystemBoot 
            userName={user?.name} 
            onComplete={() => setIsBooting(false)} 
          />
        )}
      </AnimatePresence>

      <Navbar user={user} onLogout={handleLogout} />

      <Routes>
        {/* PUBLIC / AUTH */}
        <Route path="/login" element={
          user && !isBooting ? (
            <Navigate to={user.role === 'admin' ? "/admin/dashboard" : "/"} replace />
          ) : (
            <Login onLoginSuccess={handleLoginSuccess} />
          )
        } />
        <Route path="/register" element={<Register onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/success" element={<Success />} />

        {/* DYNAMIC ROOT ROUTE: 
            If NOT logged in -> Show Cinematic Landing Page 
            If logged in -> Show Internal HomePage (Hero, Experience, etc)
        */}
        <Route path="/" element={
          user ? (
            <HomePage user={user} onLogout={handleLogout} />
          ) : (
            <LandingPage />
          )
        } />

        {/* PROTECTED CLIENT PAGES */}
        <Route path="/programs" element={
          <ProtectedRoute allowedRole="client">
            <div className="pt-20"><Programs /></div>
          </ProtectedRoute>
        } />

        <Route path="/about" element={
          <ProtectedRoute allowedRole="client">
            <div className="pt-20"><About /><Gallery /></div>
          </ProtectedRoute>
        } />

        <Route path="/contact" element={
          <ProtectedRoute allowedRole="client">
            <div className="pt-20"><Contact /></div>
          </ProtectedRoute>
        } />

        {/* ADMIN ROUTES */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard onLogout={handleLogout} />
          </ProtectedRoute>
        } />
        
        <Route path="/admin/comms" element={
          <ProtectedRoute allowedRole="admin">
            <CommsPage />
          </ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
      <TelegramFloat />
    </Router>
  );
}

export default App;