import React from 'react';

const RecommendedMovies = () => {
  return (
    <form className="recos" id="recos">
      <ul className="list-group" id="predictedMovies">
        {/* Recommended movies will be populated here */}
      </ul>
    </form>
  );
};

export default RecommendedMovies;