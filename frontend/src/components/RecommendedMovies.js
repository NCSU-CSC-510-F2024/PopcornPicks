import "../RecommendedMovies.css";

import { Badge, Button, Card, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";

import React from "react";

const RecommendedMovies = ({
    movies,
    genres,
    imdbIds,
    watchlistStatus,
    onWatchlistToggle,
    imdbRatings,
}) => {
    if (movies.length === 0) {
        return null;
    }

    return (
        <div className="recommended-movies">
            <h2 className="mb-4">Recommended Movies</h2>
            <Row xs={1} md={2} lg={3} className="g-4">
                {movies.map((movie, index) => (
                    <Col key={index}>
                        <Card className="h-100 movie-card">
                            <Card.Body>
                                <Card.Title className="movie-title">{movie}</Card.Title>
                                <div className="genre-container">
                                    {genres[index].split("|").map((genre, genreIndex) => (
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
                                        {imdbRatings[index]}/10
                                    </Badge>
                                </div>
                                <a
                                    href={`https://www.imdb.com/title/${imdbIds[index]}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="imdb-link">
                                    IMDb 🔗
                                </a>
                            </Card.Body>
                            <Card.Footer>
                                {!watchlistStatus[index] ? (
                                    <Button
                                        variant="outline-success"
                                        size="sm"
                                        onClick={() =>
                                            onWatchlistToggle(imdbIds[index], false, index)
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
        </div>
    );
};

export default RecommendedMovies;
