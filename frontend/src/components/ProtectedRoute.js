// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const ProtectedRoute = ({ children, authRequired }) => {
  const { token } = useAuth();
  
  if (authRequired && !token) {
    // User is not authenticated but the route requires authentication
    return <Navigate to="/login" replace />;
  }

  if (!authRequired && token) {
    // User is authenticated but the route is for unauthenticated users only
    return <Navigate to="/search_page" replace />;
  }

  return children;
};

export default ProtectedRoute;