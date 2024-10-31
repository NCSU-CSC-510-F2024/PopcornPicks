// Import the component for your landing page
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheet.css'; //custom CSS file

import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import LandingPage from './components/LandingPage';
import Login from './components/login';
import React from 'react';
import Register from './components/Register';
import SearchMovies from './components/SearchMovies';
import Success from './components/Success';
import Navbar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <ProtectedRoute authRequired={false}>
              <LandingPage />
            </ProtectedRoute>
          } />
          <Route path="/login" element={
            <ProtectedRoute authRequired={false}>
              <Login />
            </ProtectedRoute>
          } />
          <Route path="/register" element={
            <ProtectedRoute authRequired={false}>
              <Register />
            </ProtectedRoute>
          } />
          <Route path="/search_page" element={
            <ProtectedRoute authRequired={true}>
              <SearchMovies />
            </ProtectedRoute>
          } />
          {/* Catch-all route */}
          <Route path="*" element={
            <ProtectedRoute authRequired={true}>
              <Navigate to="/search_page" replace />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
