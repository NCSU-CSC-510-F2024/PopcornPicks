import '../SearchMovies.css';

import { Button, Col, Container, Form, ListGroup, Row } from 'react-bootstrap';
import React, { useCallback, useEffect, useState } from 'react';
import { addToWatchlist, deleteFromWatchlist, predictMovies, searchMovies } from '../apiCalls';

import Loader from './Loader';
import Navbar from './NavBar';
import RecommendedMovies from './RecommendedMovies';
import SelectedMovies from './SelectedMovies';

const SearchMovies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [genres, setGenres] = useState([]);
  const [imdbIds, setImdbIds] = useState([]);
  const [watchlistStatus, setWatchlistStatus] = useState([]);
  const [loading, setLoading] = useState(false); // State to handle loader visibility

  const debouncedSearch = useCallback(
    debounce(async (term) => {
      if (term.length >= 1) {
        try {
          const results = await searchMovies(term);
          setSearchResults(results);
        } catch (error) {
          console.error('Error searching movies:', error);
        }
      } else {
        setSearchResults([]);
      }
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  const handleMovieSelect = (movie) => {
    if (!selectedMovies.includes(movie) && selectedMovies.length < 5) {
      setSelectedMovies([...selectedMovies, movie]);
      setSearchTerm('');
      setSearchResults([]);
    }
  };

  const handleRemoveMovie = (movie) => {
    setSelectedMovies(selectedMovies.filter(m => m !== movie));
  };

  const handlePredict = async () => {
    if (selectedMovies.length === 0) {
      alert("Select at least 1 movie!");
      return;
    }

    setLoading(true); 
    try {
      const response = await predictMovies(selectedMovies);
      setRecommendations(response.recommendations);
      setGenres(response.genres);
      setImdbIds(response.imdb_id);
      setWatchlistStatus(response.Watchlist_status);
    } catch (error) {
      console.error("Error predicting movies:", error);
    }
    setLoading(false); 
  };

  const handleWatchlistToggle = async (imdbId, currentStatus, index) => {
    try {
      if (currentStatus) {
        await deleteFromWatchlist(imdbId);
      } else {
        await addToWatchlist(imdbId);
      }
      const newWatchlistStatus = [...watchlistStatus];
      newWatchlistStatus[index] = !currentStatus;
      setWatchlistStatus(newWatchlistStatus);
    } catch (error) {
      console.error('Error updating watchlist:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="netflix-bg">
      <Navbar />
      <Container className="mt-5">
        <Row className="justify-content-center mb-4">
          <Col md={8} className="text-center">
            <h1 className="netflix-header">🎬 Pick a Movie! 🎬</h1>
            <h6 className="netflix-tip">✨Tip: Select Up to 5 movies to get a tailored watchlist✨</h6>
          </Col>
        </Row>

        <Row className="justify-content-center mb-4">
          <Col md={6}>
            <h3>Selected Movie(s):</h3>
            <Form.Group className="mb-3">
              <Form.Control
                type="search"
                placeholder="Search for a Movie"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="netflix-search-input"
              />
            </Form.Group>
            {searchResults.length > 0 && (
              <ListGroup className="netflix-search-results mb-3">
                {searchResults.map((movie, index) => (
                  <ListGroup.Item
                    key={index}
                    action
                    onClick={() => handleMovieSelect(movie)}
                    className="netflix-search-item"
                  >
                    {movie}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
            <SelectedMovies 
              movies={selectedMovies} 
              onRemoveMovie={handleRemoveMovie} 
            />
            <Button variant="danger" className="w-100 mt-3" onClick={handlePredict}>
              Predict
            </Button>
          
          </Col>
          </Row>
          <Row className="justify-content-center mb-4">
          <Col md={6}>
            
            <RecommendedMovies 
              movies={recommendations}
              genres={genres}
              imdbIds={imdbIds}
              watchlistStatus={watchlistStatus}
              onWatchlistToggle={handleWatchlistToggle}
            />
          </Col>
        </Row>
        <Row className="justify-content-center mb-4">
          <Col md={8} className="text-center">
          {loading && (
      <div className="loader" id="loaderLanding">
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    )}
          </Col>
        </Row>
      </Container>

      
    </div>
    </div>
  );
};

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default SearchMovies;