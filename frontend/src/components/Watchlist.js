import '../Watchlist.css';

import { Alert, Button, Card, Col, Container, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { deleteFromWatchlist, getWatchlist } from '../apiCalls';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const fetchWatchlist = async () => {
    setIsLoading(true);
    try {
      const response = await getWatchlist();
      setWatchlist(response.watchlist || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching watchlist:', err);
      setError('Failed to fetch watchlist. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFromWatchlist = async (imdbID) => {
    try {
      await deleteFromWatchlist(imdbID);
      setWatchlist(prevWatchlist => prevWatchlist.filter(movie => movie.imdbID !== imdbID));
    } catch (err) {
      console.error('Error removing movie from watchlist:', err);
      setError('Failed to remove movie from watchlist. Please try again.');
    }
  };

  

  return (
    <Container className="watchlist-container">
      <h1 className="text-center mb-4 mt-5">My Watchlist</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {watchlist.length === 0 ? (
        <Alert variant="info">
          Your watchlist is empty. Add movies to your watchlist to see them here!
        </Alert>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {watchlist.map((movie) => (
            <Col key={movie.imdbID}>
              <Card className="h-100 watchlist-card">
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  {movie.year && <Card.Text>Year: {movie.year}</Card.Text>}
                  {movie.genres && (
                    <Card.Text className="movie-genres">
                      Genres: {movie.genres}
                    </Card.Text>
                  )}
                  <a 
                    href={`https://www.imdb.com/title/${movie.imdbID}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="imdb-link"
                  >
                    View on IMDb
                  </a>
                </Card.Body>
                <Card.Footer>
                  <Button 
                    variant="danger" 
                    onClick={() => handleRemoveFromWatchlist(movie.imdbID)}
                    className="w-100"
                  >
                    Remove from Watchlist
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    
        {isLoading && (
        <div className="d-none" id="loaderLanding">
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    )}
    </Container>
  );
};

export default Watchlist;