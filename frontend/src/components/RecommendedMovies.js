import "../RecommendedMovies.css";

import { Badge, Button, Card, Col, OverlayTrigger, Row, Tooltip, Pagination, Dropdown, DropdownButton} from "react-bootstrap";

import React, { useState, useMemo } from "react";

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
    const [sortCriteria, setSortCriteria] = useState("Rating"); // Default sort criteria - rating.
    const [sortOrder, setSortOrder] = useState("desc"); // Default to decending order.

    // Total number of pages.
    const totalPages = Math.ceil(movies.length / moviesPerPage);

    // Sort the movies array based on selected criteria.
    const sortedMoviesData = useMemo(() => { 
        const sortedMovies = [...movies]
        const sortedGenres = [...genres];
        const sortedImdbIds = [...imdbIds];
        const sortedWatchlistStatus = [...watchlistStatus];
        const sortedImdbRatings = [...imdbRatings];

        const sortedIndices = sortedMovies.map((_, i) => i);

        sortedIndices.sort((a, b) => {
            if (sortCriteria === "Rating") {
                return sortOrder === "asc"
                    ? imdbRatings[a] - imdbRatings[b]
                    : imdbRatings[b] - imdbRatings[a];
            } else if (sortCriteria === "Title") {
                return sortOrder === "asc"
                    ? movies[a].localeCompare(movies[b])
                    : movies[b].localeCompare(movies[a]);
            } else if (sortCriteria === "Genre") {
                return sortOrder === "asc"
                    ? genres[a].localeCompare(genres[b])
                    : genres[b].localeCompare(genres[a]);
            }
            return 0;
        });

        return {
            sortedMovies: sortedIndices.map(i => sortedMovies[i]),
            sortedGenres: sortedIndices.map(i => sortedGenres[i]),
            sortedImdbIds: sortedIndices.map(i => sortedImdbIds[i]),
            sortedWatchlistStatus: sortedIndices.map(i => sortedWatchlistStatus[i]),
            sortedImdbRatings: sortedIndices.map(i => sortedImdbRatings[i]),
        };
    }, [movies, genres, imdbIds, watchlistStatus, imdbRatings, sortCriteria, sortOrder]);

    const handleSortChange = (criteria) => {
        if (sortCriteria === criteria) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortCriteria(criteria);
            setSortOrder("asc"); 
        }
        setCurrentPage(1);
    };

    const startIndex = (currentPage - 1) * moviesPerPage;
    const currentMovies = sortedMoviesData.sortedMovies.slice(
        startIndex,
        startIndex + moviesPerPage
    );
    const currentGeneres = sortedMoviesData.sortedGenres.slice(
        startIndex,
        startIndex + moviesPerPage
    );
    const currentImdbIds = sortedMoviesData.sortedImdbIds.slice(
        startIndex,
        startIndex + moviesPerPage
    );
    const currentWatchlistStatus = sortedMoviesData.sortedWatchlistStatus.slice(
        startIndex,
        startIndex + moviesPerPage
    );
    const currentImdbRatings = sortedMoviesData.sortedImdbRatings.slice(
        startIndex,
        startIndex + moviesPerPage
    );


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

            <div className="d-flex justify-content-between align-items-center mb-3">
            <Dropdown>
                    <Dropdown.Toggle
                        key={`${sortCriteria}-${sortOrder}`}
                        variant="secondary" size="sm" id="sort-dropdown"
                        className="custom-toggle"
                    >
                        <span className="me-2">Sort</span>
                        <i className={`bi ${sortOrder === "asc" ? "bi-sort-up" : "bi-sort-down"}`}></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleSortChange("Rating")}>
                            <i className="bi bi-star-fill me-2"></i> Rating
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSortChange("Title")}>
                            <i className="bi bi-film me-2"></i> Title
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSortChange("Genre")}>
                            <i className="bi bi-tag me-2"></i> Genre
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
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
