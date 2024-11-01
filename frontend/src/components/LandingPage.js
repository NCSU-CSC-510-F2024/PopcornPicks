import '../stylesheet.css';

import React, { useState } from 'react';

import Navbar from './NavBar';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getStarted = () => {
    setLoading(true);
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <div className="landing-page">
      <Navbar />
      <div className="landing-content">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 text-center">
              <h1 className="main-title">🎬 PopcornPicks 🍿</h1>
              <h2 className="subtitle">Your Personal Movie Recommender</h2>
              

              <p className="description">
               

              Discover personalized movie recommendations by selecting up to 5 of your favorite films. 
                Create your own watchlist and access IMDb ratings and links for informed choices. 
                With PopcornPicks, enjoy movies at your own pace, on your terms. 
                Let's make every movie night a blockbuster!
              </p>
              <button 
                id="getStartedButton" 
                onClick={getStarted} 
                className="btn btn-lg btn-primary get-started-btn"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Get Started!'}
              </button>
            </div>
          </div>
        </div>
      </div>
      {loading && (
        <div className="loader-overlay">
          <div className="loader">
            <div className="spinner-border text-light" role="status">
              <span className="sr-only"></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;