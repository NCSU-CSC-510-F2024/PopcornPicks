// Import the component for your landing page
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheet.css'; // Your custom CSS file

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import Login from './components/login';
import React from 'react';
import Register from './components/Register';
import SearchMovies from './components/SearchMovies';
import Success from './components/Success';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/search_page" element={<SearchMovies />} />
      <Route path="/success" element={<Success />} />
    </Routes>
  </Router>
  );
}

export default App;
