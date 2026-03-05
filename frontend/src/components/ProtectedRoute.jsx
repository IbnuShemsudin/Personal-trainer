import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const sessionData = localStorage.getItem('user');
  const user = sessionData ? JSON.parse(sessionData) : null;

  // If no user is logged in, send to login
  if (!user || !user.token) {
    return <Navigate to="/login" replace />;
  }

  // If a specific role is required (like 'admin') and user doesn't have it
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;