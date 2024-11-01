import { Button, Card } from 'react-bootstrap';

import React from 'react';

const SelectedMovies = ({ movies, onRemoveMovie }) => {
  return (
    <div className="selected-movies-container">
      {movies.map((movie, index) => (
        <Card key={index} className="netflix-card mb-2">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <Card.Title className="mb-0">{movie}</Card.Title>
              <Button 
                variant="outline-danger" 
                size="sm" 
                onClick={() => onRemoveMovie(movie)}
                className="netflix-button-outline"
              >
                Remove
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default SelectedMovies;