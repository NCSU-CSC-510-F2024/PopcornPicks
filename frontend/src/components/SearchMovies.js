import '../stylesheet.css';

import React, { useState } from 'react';

import FeedbackButton from './FeedbackButton';
import Navbar from './NavBar';
import RecommendedMovies from './RecommendedMovies';
import SelectedMovies from './SelectedMovies';

//import { useNavigate } from 'react-router-dom';

const SearchMovies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDataCollected, setShowDataCollected] = useState(false);
  //const navigate = useNavigate();

  const handlePredict = () => {
    setIsLoading(true);
    
    // Implement prediction logic here
    setTimeout(() => setIsLoading(false), 2000); // Simulating API call
  };

  const handleRefresh = () => {
    setShowDataCollected(false);
  };

  return (
    <div>
      <Navbar />
      <div className="container" style={{ marginTop: '60px' }}>
        <div className="heading1">
          <h2><center>🎬 Pick a Movie! 🎬</center></h2>
          <h6 className="tipHeader">✨Tip: Select Up to 5 movies to get a tailored watchlist✨</h6>
        </div>

        <div className="row" style={{ marginTop: '25px' }}>
          <div className="col-md-6">
            <h3>Selected Movie(s):</h3>
            <div className="d-flex justify-content-between">
              <div className="col-md-9">
                <input 
                  className="form-control mr-sm-2" 
                  type="search" 
                  placeholder="Search for a Movie" 
                  aria-label="Search" 
                  id="searchBox"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <SelectedMovies />
              </div>
              <div className="col-md-2">
                <button className="btn btn-primary" onClick={handlePredict}>Predict</button>
              </div>
            </div>
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-5">
            <h2>Recommended Movies:</h2>
            <RecommendedMovies />
            <FeedbackButton />
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="d-flex justify-content-center" id="loader">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      )}

      <div className="container" style={{ marginTop: '20px' }}>
        <div className="row">
          <div className="col-md-12">
            <input className="c-checkbox" type="checkbox" id="checkbox" />
          </div>
        </div>
      </div>

      {showDataCollected && (
        <div className="container" style={{ marginTop: '20px' }}>
          <div className="row">
            <div className="col-md-8">
              <div id="dataCollected">
                <h1>Thanks!! Your response was stored.</h1>
                <button className="btn btn-danger" onClick={handleRefresh}>Take another attempt</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchMovies;