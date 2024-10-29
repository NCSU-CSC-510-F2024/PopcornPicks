import React, { useState, useEffect } from 'react';
import { searchMovies, predictMovies } from '../apiCalls';
import Navbar from './NavBar';
import SelectedMovies from './SelectedMovies';
import RecommendedMovies from './RecommendedMovies';
import FeedbackButton from './FeedbackButton';

const SearchMovies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDataCollected, setShowDataCollected] = useState(false);

  useEffect(() => {
    if (searchTerm.length >= 1) {
      const delayDebounceFn = setTimeout(() => {
        handleSearch();
      }, 300);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchTerm]);

  const handleSearch = async () => {
    try {
      const results = await searchMovies(searchTerm);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  const handleMovieSelect = (movie) => {
    if (!selectedMovies.includes(movie)) {
      setSelectedMovies([...selectedMovies, movie]);
      setSearchTerm('');
      setSearchResults([]);
    }
  };

  const handlePredict = async () => {
    if (selectedMovies.length === 0) {
      alert("Select at least 1 movie!");
      return;
    }

    setIsLoading(true);
    try {
      const response = await predictMovies(selectedMovies);
      setRecommendations(response.recommendations);
    } catch (error) {
      console.error("Error predicting movies:", error);
    }
    setIsLoading(false);
  };

  const handleRefresh = () => {
    setShowDataCollected(false);
    setSelectedMovies([]);
    setRecommendations([]);
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
                {searchResults.length > 0 && (
                  <ul className="list-group mt-2">
                    {searchResults.map((movie, index) => (
                      <li 
                        key={index} 
                        className="list-group-item" 
                        onClick={() => handleMovieSelect(movie)}
                      >
                        {movie}
                      </li>
                    ))}
                  </ul>
                )}
                <SelectedMovies movies={selectedMovies} />
              </div>
              <div className="col-md-2">
                <button className="btn btn-primary" onClick={handlePredict}>Predict</button>
              </div>
            </div>
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-5">
            <h2>Recommended Movies:</h2>
            <RecommendedMovies movies={recommendations} />
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