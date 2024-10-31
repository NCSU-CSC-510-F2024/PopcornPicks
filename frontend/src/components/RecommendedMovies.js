import React from 'react';

const RecommendedMovies = ({ movies, genres, imdbIds, watchlistStatus, onWatchlistToggle }) => {
  return (
    <div>
     
    {movies.length > 0 && (
      <h2>Recommended Movies:</h2>
    )}
    <ul id="predictedMovies" className="list-group">
      {movies.map((movie, index) => (
        <li key={index} className="list-group-item">
          <div>
            <span>{movie}</span>
            <a 
              href={`https://www.imdb.com/title/${imdbIds[index]}`} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{textDecoration: 'none', marginLeft: '10px'}}
            >
              IMDb🔗
            </a>
          </div>
          <div>Genre: {genres[index]}</div>
          <button 
            onClick={() => onWatchlistToggle(imdbIds[index], watchlistStatus[index], index)}
            className={`btn btn-sm ${watchlistStatus[index] ? 'btn-danger' : 'btn-success'}`}
          >
            {watchlistStatus[index] ? 'Remove from Watchlist' : 'Add to Watchlist'}
          </button>
          <div className="mt-2">
            <table className='table predictTable'>
              <tbody>
                <tr>
                  <td className='radio-inline'>
                    <section id="pattern1">
                      <label style={{"--icon": "'😍'"}}><input type="radio" name={`feedback-${index}`} value='3' data-toggle="tooltip" data-placement="top" title="LIKE" /></label>
                    </section>
                  </td>
                  <td className='radio-inline'>
                    <section id="pattern1">
                      <label style={{"--icon": "'😐'"}}><input type="radio" name={`feedback-${index}`} value='2' data-toggle="tooltip" data-placement="top" title="YET TO WATCH" /></label>
                    </section>
                  </td>
                  <td className='radio-inline'>
                    <section id="pattern1">
                      <label style={{"--icon": "'😤'"}}><input type="radio" name={`feedback-${index}`} value='1' data-toggle="tooltip" data-placement="top" title="DISLIKE" /></label>
                    </section>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </li>
      ))}
    </ul>
    </div>
  );
};

export default RecommendedMovies;