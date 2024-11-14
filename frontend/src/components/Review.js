import React, { useState, useEffect } from 'react';
import Navbar from './NavBar';
import { Button, Container, ListGroup } from 'react-bootstrap';
import { addReview, getMovies, searchMovies } from '../apiCalls';
import '../Review.css';

const Review = () => {
  const [rating, setRating] = useState(0);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState('');
  const [comments, setComments] = useState('');
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
        if (searchTerm === "") {
            setMovies([]);
            return;
        }
        try {
            const response = await searchMovies(searchTerm)
            setMovies(response);  // Only a small set of movies based on search
            console.log(data)
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };
    // Fetch movies after user stops typing for 300ms (debounce)
    const debounceFetch = setTimeout(fetchMovies, 300);
    return () => clearTimeout(debounceFetch);
    }, [searchTerm]); // Only refetch when searchTerm changes

  const handleRating = (value) => {
    setRating(value);
  };

  const handleSelectedMovie = (movie) => {
    setSelectedMovie(movie)
    setSearchTerm("");
  };

  const handleSubmit = async () => {
    const data = {
      movie: selectedMovie,
      score: rating,
      review: comments,
    };

    try {
        const response = await addReview(data);
      } catch (err) {
        console.log('Failed to submit review.');
      } finally {
        alert(`Review submitted for ${selectedMovie}. Rating: ${rating}/10`);
        setSelectedMovie('');
        setComments('');
        setRating(0);
        setSearchTerm("");
      }
  };

  return (
    <div>
      <Navbar />
        <div className="netflix-bg">
      <Navbar />
      <Container style={{ marginTop: '80px' }}>
        <h2 className="text-center">Review a Movie</h2>
        <p className="text-center">Select a movie from the list and submit your rating and comments!</p>

        <div className="centering-wrapper">
        <div id="container">
            <div id="search-bar">
            <label className="text-black" htmlFor="movie-select">Select a movie:</label>
                <input
                    type="text"
                    id="movie-select"
                    className="form-control"
                    placeholder="Search for a movie"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {movies.length > 0 && (
                    <ListGroup>
                        {movies.map((title, id) => (
                            <ListGroup.Item
                                key={id}
                                action
                                onClick={() => handleSelectedMovie(title)}
                                className="netflix-search-item">
                                {title}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
                <ul className="list-group" id="selectedMovie">
                    {selectedMovie && <li className="list-group-item">{selectedMovie}</li>}
                </ul>
            </div>

            <div id="rating-section">
            <label className="text-black" htmlFor="movie-rating">Rating:</label>
            <div className="star-container">
                {[...Array(10)].map((_, i) => (
                    <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill={i < rating ? 'gold' : 'currentColor'}
                    className="bi bi-star-fill"
                    viewBox="0 0 16 16"
                    onClick={() => handleRating(i + 1)}
                    >
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                ))}
            </div>
            <br /><br />
            <label className="text-black" htmlFor="comments">Comments:</label>
            <textarea
                id="comments"
                rows="4"
                cols="50"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
            />
            <button id="submit-btn" onClick={handleSubmit}>
                Submit
            </button>
            </div>
        </div>
        </div>
        </Container>
      </div>
    </div>
  );
};

export default Review;
