import React from 'react';

const RecommendedMovies = ({ movies }) => {
  return (
    <ul id="predictedMovies" className="list-group">
      {movies.map((movie, index) => (
        <li key={index} className="list-group-item">
          {movie}
          <div className="mt-2">
            <table className='table predictTable'>
              <tr>
                <td className='radio-inline'>
                  <section id="pattern1">
                    <label style={{"--icon": "'😍'"}}><input type="radio" name={index} value='3' data-toggle="tooltip" data-placement="top" title="LIKE" /></label><br />
                  </section>
                </td>
                <td className='radio-inline'>
                  <section id="pattern1">
                    <label style={{"--icon": "'😐'"}}><input type="radio" name={index} value='2' data-toggle="tooltip" data-placement="top" title="YET TO WATCH" /></label><br />
                  </section>
                </td>
                <td className='radio-inline'>
                  <section id="pattern1">
                    <label style={{"--icon": "'😤'"}}><input type="radio" name={index} value='1' data-toggle="tooltip" data-placement="top" title="DISLIKE" /></label><br />
                  </section>
                </td>
              </tr>
            </table>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default RecommendedMovies;