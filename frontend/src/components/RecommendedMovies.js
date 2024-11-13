import "../RecommendedMovies.css";

import { Badge, Button, Card, Col, OverlayTrigger, Row, Tooltip, Pagination } from "react-bootstrap";

import React, { useState } from "react";

const RecommendedMovies = ({
    movies,
    genres,
    imdbIds,
    watchlistStatus,
    onWatchlistToggle,
    imdbRatings,
}) => {

    const moviesPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    // Total number of pages.
    const totalPages = Math.ceil(movies.length / moviesPerPage);

    const startIndex = (currentPage - 1) * moviesPerPage;
    const currentMovies = movies.slice(startIndex, startIndex + moviesPerPage)
    const currentGeneres = genres.slice(startIndex, startIndex + moviesPerPage)
    const currentImdbIds = imdbIds.slice(startIndex, startIndex + moviesPerPage)
    const currentWatchlistStatus = watchlistStatus.slice(startIndex, startIndex + moviesPerPage)
    const currentImdbRatings = imdbRatings.slice(startIndex, startIndex + moviesPerPage)

    // Handle page number change.
    const handlePageChange = (pageNumber) => { 
        setCurrentPage(pageNumber)
    }

    
    if (movies.length === 0) {
        return null;
    }

    return (
        <div className="recommended-movies">
            <h2 className="mb-4">Recommended Movies</h2>
            <Row xs={1} md={2} lg={3} className="g-4">
                {currentMovies.map((movie, index) => (
                    <Col key={index}>
                        <Card className="h-100 movie-card">
                            <Card.Body>
                                <Card.Title className="movie-title">{movie}</Card.Title>
                                <div className="genre-container">
                                    {currentGeneres[index].split("|").map((genre, genreIndex) => (
                                        <OverlayTrigger
                                            key={genreIndex}
                                            placement="top"
                                            overlay={
                                                <Tooltip id={`tooltip-${index}-${genreIndex}`}>
                                                    {genre}
                                                </Tooltip>
                                            }>
                                            <Badge bg="secondary" className="me-1 mb-1">
                                                {genre.substring(0, 3)}
                                            </Badge>
                                        </OverlayTrigger>
                                    ))}
                                </div>

                                <div className="rating-container">
                                    <Badge bg="info" className="me-1 mb-1">
                                        {currentImdbRatings[index]}/10
                                    </Badge>
                                </div>
                                <a
                                    href={`https://www.imdb.com/title/${currentImdbIds[index]}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="imdb-link">
                                    IMDb 🔗
                                </a>
                            </Card.Body>
                            <Card.Footer>
                                {!currentWatchlistStatus[index] ? (
                                    <Button
                                        variant="outline-success"
                                        size="sm"
                                        onClick={() =>
                                            onWatchlistToggle(imdbIds[index], false, index + startIndex)
                                        }
                                        className="w-100">
                                        Add to Watchlist
                                    </Button>
                                ) : (
                                    <Badge bg="success" className="w-100 py-2">
                                        Added to Watchlist
                                    </Badge>
                                )}
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Pagination className="justify-content-center mt-4">
                <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                {[...Array(totalPages)].map((_, pageIndex) => (
                    <Pagination.Item
                        key={pageIndex}
                        active={pageIndex + 1 === currentPage}
                        onClick={() => handlePageChange(pageIndex + 1)}
                    >
                        {pageIndex + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
            </Pagination>
        </div>
    );
};

export default RecommendedMovies;
