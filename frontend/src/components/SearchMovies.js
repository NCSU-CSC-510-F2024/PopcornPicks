import '../stylesheet.css';

import React from 'react';

function SearchMovies() {
  return (
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
            />
            <ul className="list-group" id="selectedMovies"></ul>
          </div>
          <div className="col-md-2">
            <input type="button" className="btn btn-primary" name="predict" id="predict" value="Predict" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchMovies;
