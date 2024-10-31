import React from 'react';

const SelectedMovies = ({ movies }) => {
  return (
    <ul id="selectedMovies" className="list-group mt-2">
      {movies.map((movie, index) => (
        <li key={index} className="list-group-item">{movie}</li>
      ))}
    </ul>
  );
};

export default SelectedMovies;