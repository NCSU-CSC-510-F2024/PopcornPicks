import '../stylesheet.css';

import React, { useEffect, useState } from 'react';
import { Button, Container, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

import { getWallData } from '../apiCalls';
import Navbar from './NavBar';
import Post from './Post'

const Wall = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await getWallData();
        setPosts(response.ratings);
      } catch (err) {
        setError('Failed to load posts.');
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
    renderPosts();
  }, []);

  async function renderPosts() {
    posts.forEach(post => buildPost(post));
  }

  async function buildPost(post){
    
    var movieData;
    try{
        movieData = await fetchMovieData(post.imdbID);
    } catch(error){
        console.error(error);
    }
    
    var image = $('<img>', {src: movieData.Poster, alt: 'Image not found', style: 'width:100px;'})

    for(let i = 0; i < post.score; i++){
        var star = $('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>');
        reviewDiv.append(star);
    }

    var halfStar = $('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-half" viewBox="0 0 16 16"><path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z"/></svg>');
    if((post.score * 10) % 10 > 0){
        reviewDiv.append(halfStar);
    }

    var commentDiv = $('<div>').addClass('comment').text(post.review);

 
    var dataDiv = $('<div>').addClass('movie-data');

    var ratedDiv = $('<div>').text(movieData.Rated);
    var yearDiv = $('<div>').text(movieData.Year);
    var genreDiv = $('<div>').text(movieData.Genre);
    var runtimeDiv = $('<div>').text(movieData.Runtime);

    dataDiv.append(ratedDiv, yearDiv, genreDiv, runtimeDiv);

    imageDiv.append(image);
    userDiv.append(titleDiv, reviewDiv, commentDiv);
    postDiv.append(imageDiv, userDiv, dataDiv);
    postContainer.append(postDiv);
  }

  const fetchMovieData = async (imdbID) => {
    try {
      const response = await axios.get('http://www.omdbapi.com/', {
        params: {
          i: imdbID,
          apikey: '77da67f1',
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

    // const renderStars = (score) => {
    //     const fullStars = Math.floor(score);
    //     const halfStar = score % 1 !== 0;
    
    //     return (
    //       <>
    //         {[...Array(fullStars)].map((_, i) => (
    //           <i key={i} className="bi bi-star-fill" style={{ color: 'gold' }}></i>
    //         ))}
    //         {halfStar && <i className="bi bi-star-half" style={{ color: 'gold' }}></i>}
    //       </>
    //     );
    //   };

  return (
    <div>
      <Navbar />
      <div className="netflix-bg">
      <Navbar />

      <Container style={{ marginTop: '80px' }}>
        <h2 className="text-center">Popcorn Picks Wall</h2>
        <p className="text-center">View other user ratings on movies!</p>

        {loading ? (
          <div className="d-flex justify-content-center mt-4">
            <Spinner animation="border" role="status" />
          </div>
        ) : error ? (
          <Alert variant="danger" className="mt-4">{error}</Alert>
        ) : (
          <div id="post-container">
            {posts && posts.length === 0 && <p className="text-center"> No posts available </p>}
            <div className="posts-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {posts.map(post => (
                    <Post key={post.id} post={post} />
                ))}
            </div>
          </div>
        )}
      </Container>
      </div>
    </div>
  );
};

export default Wall;
